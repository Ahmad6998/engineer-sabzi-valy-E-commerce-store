import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const DATA_DIR = path.resolve(ROOT_DIR, 'server/data');
const UPLOADS_DIR = path.resolve(ROOT_DIR, 'public/uploads');
const PORT = process.env.PORT || 5000;

// Ensure storage directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Helper: read and write JSON files safely
const readJson = (filename, fallback = []) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
  }
  return fallback;
};

const writeJson = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return false;
  }
};

// Request Body Parser helper
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Protect from extreme payload (10MB limit)
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

// Response helper
const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.end(JSON.stringify(data));
};

// MIME Types helper for static upload and frontend files
const getMimeType = (ext) => {
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
};

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // 1. Health check
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, { status: 'healthy', timestamp: new Date().toISOString() });
  }

  // 2. Static uploads serving (/uploads/<file>)
  if (pathname.startsWith('/uploads/')) {
    const filename = path.basename(pathname);
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename);
      res.statusCode = 200;
      res.setHeader('Content-Type', getMimeType(ext));
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      fs.createReadStream(filePath).pipe(res);
      return;
    }
    return sendJson(res, 404, { error: 'File not found' });
  }

  // 3. Products Endpoints (/api/products)
  if (pathname === '/api/products') {
    if (req.method === 'GET') {
      const products = readJson('products.json', null);
      if (products && Array.isArray(products) && products.length > 0) {
        return sendJson(res, 200, products);
      }
      return sendJson(res, 404, { error: 'No products stored yet' });
    }

    if (req.method === 'POST') {
      try {
        const body = await parseBody(req);
        if (Array.isArray(body)) {
          writeJson('products.json', body);
          // Also sync to public folder for static build compatibility
          try {
            fs.writeFileSync(path.resolve(ROOT_DIR, 'public/store_products.json'), JSON.stringify(body, null, 2), 'utf-8');
            fs.writeFileSync(path.resolve(ROOT_DIR, 'src/data/store_products.json'), JSON.stringify(body, null, 2), 'utf-8');
          } catch (e) {}
          return sendJson(res, 200, { success: true, count: body.length });
        }
        return sendJson(res, 400, { error: 'Expected an array of products' });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // 4. Image Upload Endpoint (/api/upload)
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
      const filepath = path.join(UPLOADS_DIR, filename);

      const buffer = Buffer.from(matches[2], 'base64');
      fs.writeFileSync(filepath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return sendJson(res, 200, { success: true, url: publicUrl, filename });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 5. Orders Endpoints (/api/orders)
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
        const updatedOrders = [newOrder, ...currentOrders];
        writeJson('orders.json', updatedOrders);
        return sendJson(res, 201, { success: true, order: newOrder });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // Orders update status / delete (/api/orders/:orderId)
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

  // 6. Mandi Rates Endpoints (/api/mandi-rates)
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

  // 7. Settings Endpoints (/api/settings)
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

  // 8. Serve built frontend from dist/ if available
  const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
  if (fs.existsSync(DIST_DIR) && !pathname.startsWith('/api/')) {
    let cleanPath = pathname === '/' ? '/index.html' : pathname;
    let filePath = path.join(DIST_DIR, cleanPath);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', getMimeType(ext));
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // Default 404
  return sendJson(res, 404, { error: 'API route not found' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Engineer Sabzi Valy Backend Server running on http://0.0.0.0:${PORT}`);
});
