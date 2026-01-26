import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'php-mock-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && req.url === '/save_content.php') {
              let body = '';
              req.on('data', chunk => body += chunk.toString());
              req.on('end', () => {
                try {
                  const content = JSON.parse(body);
                  const filePath = path.resolve(__dirname, 'public/content.json');
                  fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, message: err.message }));
                }
              });
              return;
            }
            if (req.method === 'POST' && req.url === '/login.php') {
              let body = '';
              req.on('data', chunk => body += chunk.toString());
              req.on('end', () => {
                try {
                  const login = JSON.parse(body);
                  if (login.password === 'admin123') {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true }));
                  } else {
                    res.end(JSON.stringify({ success: false, message: 'Senha inválida' }));
                  }
                } catch (err) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ success: false }));
                }
              });
              return;
            }

            // Mock Image Upload Handler (Simplified for Dev)
            if (req.method === 'POST' && req.url === '/upload_image.php') {
              const boundary = req.headers['content-type']?.split('boundary=')[1];
              if (!boundary) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, message: 'No boundary' }));
                return;
              }

              const chunks: Buffer[] = [];
              req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
              req.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const boundaryBuffer = Buffer.from('--' + boundary);
                // Simple parser for single file 'image' field
                const parts = buffer.toString('binary').split(boundaryBuffer.toString('binary'));

                for (const part of parts) {
                  if (part.includes('filename="')) {
                    const filenameMatch = part.match(/filename="(.+?)"/);
                    if (filenameMatch) {
                      const cleanName = filenameMatch[1].replace(/\s/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '');
                      const filename = Date.now() + '_' + cleanName;
                      const headerEnd = part.indexOf('\r\n\r\n');
                      if (headerEnd !== -1) {
                        const content = part.substring(headerEnd + 4, part.lastIndexOf('\r\n'));

                        const imagesDir = path.resolve(__dirname, 'public/images');
                        if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

                        fs.writeFileSync(path.join(imagesDir, filename), content, 'binary');
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, url: `/images/${filename}` }));
                        return;
                      }
                    }
                  }
                }
                res.end(JSON.stringify({ success: false, message: 'No file found' }));
              });
              return;
            }
            next();
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
