import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function apiServerPlugin() {
  const uploadsDir = path.resolve(process.cwd(), 'public/uploads');
  const storeDataFile = path.resolve(process.cwd(), 'src/data/store_products.json');
  const publicDataFile = path.resolve(process.cwd(), 'public/store_products.json');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const setupMiddlewares = (server) => {
    server.middlewares.use((req, res, next) => {
      // 1. GET /api/products - Live sync for all customer devices
      if (req.method === 'GET' && req.url === '/api/products') {
        try {
          if (fs.existsSync(storeDataFile)) {
            const data = fs.readFileSync(storeDataFile, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.end(data);
            return;
          }
        } catch (e) {}
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'No stored products yet' }));
        return;
      }

      // 2. POST /api/products - Save products to server disk
      if (req.method === 'POST' && req.url === '/api/products') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (Array.isArray(parsed)) {
              fs.writeFileSync(storeDataFile, JSON.stringify(parsed, null, 2), 'utf-8');
              fs.writeFileSync(publicDataFile, JSON.stringify(parsed, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: parsed.length }));
              return;
            }
          } catch (err) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Invalid data format' }));
        });
        return;
      }

      // 3. POST /api/upload - Save picture to public/uploads/ so any device can view it
      if (req.method === 'POST' && req.url === '/api/upload') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const { image, name } = JSON.parse(body);
            if (!image || !image.startsWith('data:image/')) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid image format' }));
              return;
            }

            const matches = image.match(/^data:image\/([A-Za-z0-9-+]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid base64 image data' }));
              return;
            }

            const rawExt = matches[1].toLowerCase();
            const ext = rawExt.includes('png') ? 'png' : rawExt.includes('webp') ? 'webp' : 'jpg';
            const cleanSlug = (name || 'produce')
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '-')
              .replace(/-+/g, '-')
              .slice(0, 25);
            const filename = `${cleanSlug}-${Date.now()}.${ext}`;
            const filepath = path.join(uploadsDir, filename);

            const buffer = Buffer.from(matches[2], 'base64');
            fs.writeFileSync(filepath, buffer);

            const publicUrl = `/uploads/${filename}`;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: publicUrl, filename }));
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        });
        return;
      }

      next();
    });
  };

  return {
    name: 'api-server-plugin',
    configureServer(server) {
      setupMiddlewares(server);
    },
    configurePreviewServer(server) {
      setupMiddlewares(server);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: true
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: true
  }
});

