const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

let tasks = [
  { id: 1, title: 'Task One', completed: false },
  { id: 2, title: 'Task Two', completed: true },
  { id: 3, title: 'Task Three', completed: false },
];

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

function sendJSON(res, status, data) {
  const payload = JSON.stringify(data);
  setCORS(res);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function handleOptions(req, res) {
  setCORS(res);
  res.writeHead(204);
  res.end();
}

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      if (!body) return resolve(null);
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (req.method === 'OPTIONS') return handleOptions(req, res);

  if (pathname === '/health' && req.method === 'GET') {
    return sendJSON(res, 200, { status: 'ok', time: Date.now() });
  }

  if (pathname === '/api/tasks') {
    if (req.method === 'GET') {
      return sendJSON(res, 200, tasks);
    }

    if (req.method === 'POST') {
      try {
        const body = await parseJSONBody(req);
        if (!body || typeof body.title !== 'string') {
          return sendJSON(res, 400, { error: 'invalid payload, expected { title: string }' });
        }
        const id = (tasks.reduce((m, t) => Math.max(m, t.id || 0), 0) || 0) + 1;
        const task = { id, title: body.title, completed: !!body.completed };
        tasks.push(task);
        return sendJSON(res, 201, task);
      } catch (e) {
        return sendJSON(res, 400, { error: 'invalid json' });
      }
    }

    if (req.method === 'DELETE') {
      tasks = [];
      return sendJSON(res, 200, { ok: true });
    }
  }

  if (pathname === '/' && req.method === 'GET') {
    setCORS(res);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('angular-studies simple server');
  }

  sendJSON(res, 404, { error: 'not found' });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
