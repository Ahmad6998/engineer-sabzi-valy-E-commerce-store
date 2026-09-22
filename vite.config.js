import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function apiServerPlugin() {
  const rootDir = process.cwd();
  const uploadsDir = path.resolve(rootDir, 'public/uploads');
  const dataDir = path.resolve(rootDir, 'server/data');
  const storeDataFile = path.resolve(rootDir, 'src/data/store_products.json');
  const publicDataFile = path.resolve(rootDir, 'public/store_products.json');

  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const readJson = (filename, fallback = null) => {
    const filePath = path.join(dataDir, filename);
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    } catch (e) {}
    return fallback;
  };

  const writeJson = (filename, data) => {
    const filePath = path.join(dataDir, filename);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      return false;
    }
  };

  const parseBody = (req) => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 10 * 1024 * 1024) {
          req.destroy();
          reject(new Error('Payload too large'));
        }
      });
      req.on('end', () => {
        if (!body) return resolve({});
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      req.on('error', reject);
    });
  };

  const sendJson = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.end(JSON.stringify(data));
  };

  const setupMiddlewares = (server) => {
    server.middlewares.use(async (req, res, next) => {
      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
        res.end();
        return;
      }

      const parsedUrl = new URL(req.url, 'http://localhost');
      const pathname = parsedUrl.pathname;

      // 1. GET /api/health
      if (pathname === '/api/health' && req.method === 'GET') {
        return sendJson(res, 200, { status: 'healthy', timestamp: new Date().toISOString() });
      }

      // 2. /api/products and /api/products/:id
      if (pathname === '/api/products') {
        if (req.method === 'GET') {
          const products = readJson('products.json', null);
          if (products !== null && Array.isArray(products)) {
            return sendJson(res, 200, products);
          }
          if (fs.existsSync(publicDataFile)) {
            try {
              const data = JSON.parse(fs.readFileSync(publicDataFile, 'utf-8'));
              if (Array.isArray(data)) return sendJson(res, 200, data);
            } catch (e) {}
          }
          return sendJson(res, 200, []);
        }

        if (req.method === 'POST') {
          try {
            const body = await parseBody(req);
            if (Array.isArray(body)) {
              writeJson('products.json', body);
              try {
                fs.writeFileSync(publicDataFile, JSON.stringify(body, null, 2), 'utf-8');
              } catch (e) {}
              return sendJson(res, 200, { success: true, count: body.length });
            } else if (body && body.id) {
              const current = readJson('products.json', []);
              const exists = current.some(p => p.id === body.id);
              const updated = exists ? current.map(p => p.id === body.id ? { ...p, ...body } : p) : [body, ...current];
              writeJson('products.json', updated);
              try {
                fs.writeFileSync(publicDataFile, JSON.stringify(updated, null, 2), 'utf-8');
              } catch (e) {}
              return sendJson(res, 200, { success: true, product: body });
            }
            return sendJson(res, 400, { error: 'Expected an array of products or a product object' });
          } catch (err) {
            return sendJson(res, 400, { error: err.message });
          }
        }
      }

      if (pathname.startsWith('/api/products/')) {
        const prodId = decodeURIComponent(pathname.replace('/api/products/', ''));
        const current = readJson('products.json', []);

        if (req.method === 'DELETE') {
          const updated = current.filter(p => p.id !== prodId);
          writeJson('products.json', updated);
          try {
            fs.writeFileSync(publicDataFile, JSON.stringify(updated, null, 2), 'utf-8');
          } catch (e) {}
          return sendJson(res, 200, { success: true, deletedId: prodId, count: updated.length });
        }

        if (req.method === 'PATCH' || req.method === 'PUT') {
          try {
            const updates = await parseBody(req);
            const updated = current.map(p => p.id === prodId ? { ...p, ...updates } : p);
            writeJson('products.json', updated);
            try {
              fs.writeFileSync(publicDataFile, JSON.stringify(updated, null, 2), 'utf-8');
            } catch (e) {}
            return sendJson(res, 200, { success: true, id: prodId });
          } catch (err) {
            return sendJson(res, 400, { error: err.message });
          }
        }
      }

      // 3. POST /api/upload
      if (pathname === '/api/upload' && req.method === 'POST') {
        try {
          const { image, name } = await parseBody(req);
          if (!image || !image.startsWith('data:image/')) {
            return sendJson(res, 400, { error: 'Invalid image format. Expected data:image/...' });
          }
          const matches = image.match(/^data:image\/([A-Za-z0-9-+]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            return sendJson(res, 400, { error: 'Invalid base64 payload' });
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
          return sendJson(res, 200, { success: true, url: publicUrl, filename });
        } catch (err) {
          return sendJson(res, 500, { error: err.message });
        }
      }

      // 4. /api/orders
      if (pathname === '/api/orders') {
        if (req.method === 'GET') {
          const orders = readJson('orders.json', []);
          return sendJson(res, 200, orders);
        }
        if (req.method === 'POST') {
          try {
            const newOrder = await parseBody(req);
            if (!newOrder || !newOrder.orderId) {
              return sendJson(res, 400, { error: 'Invalid order structure' });
            }
            const currentOrders = readJson('orders.json', []);
            const updated = [newOrder, ...currentOrders.filter(o => o.orderId !== newOrder.orderId)];
            writeJson('orders.json', updated);
            return sendJson(res, 201, { success: true, order: newOrder });
          } catch (err) {
            return sendJson(res, 400, { error: err.message });
          }
        }
      }

      // /api/orders/:orderId
      if (pathname.startsWith('/api/orders/')) {
        const orderId = pathname.replace('/api/orders/', '');
        const currentOrders = readJson('orders.json', []);
        if (req.method === 'PATCH') {
          try {
            const { status } = await parseBody(req);
            const updated = currentOrders.map(o => o.orderId === orderId ? { ...o, status } : o);
            writeJson('orders.json', updated);
            return sendJson(res, 200, { success: true, orderId, status });
          } catch (err) {
            return sendJson(res, 400, { error: err.message });
          }
        }
        if (req.method === 'DELETE') {
          const filtered = currentOrders.filter(o => o.orderId !== orderId);
          writeJson('orders.json', filtered);
          return sendJson(res, 200, { success: true, orderId });
        }
      }

      // 5. /api/mandi-rates
      if (pathname === '/api/mandi-rates') {
        if (req.method === 'GET') {
          const mandiRates = readJson('mandiRates.json', null);
          if (mandiRates) return sendJson(res, 200, mandiRates);
          return sendJson(res, 404, { error: 'No mandi rates stored' });
        }
        if (req.method === 'POST') {
          try {
            const body = await parseBody(req);
            writeJson('mandiRates.json', body);
            return sendJson(res, 200, { success: true });
          } catch (err) {
            return sendJson(res, 400, { error: err.message });
          }
        }
      }

      // 6. /api/settings
      if (pathname === '/api/settings') {
        if (req.method === 'GET') {
          const settings = readJson('settings.json', null);
          if (settings) return sendJson(res, 200, settings);
          return sendJson(res, 404, { error: 'No settings stored' });
        }
        if (req.method === 'POST') {
          try {
            const body = await parseBody(req);
            writeJson('settings.json', body);
            return sendJson(res, 200, { success: true });
          } catch (err) {
            return sendJson(res, 400, { error: err.message });
          }
        }
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
    strictPort: true,
    allowedHosts: true
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true
  }
});

