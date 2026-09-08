import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'preview-generated-pages',
      configurePreviewServer(server) {
        // Serve physical route HTML for extensionless links, as Netlify does.
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url, 'http://localhost');
          const base = path.resolve(
            server.config.root,
            server.config.build.outDir
          );
          const file = path.resolve(base, `.${url.pathname}`, 'index.html');
          if (file.startsWith(base + path.sep) && existsSync(file)) {
            request.url =
              url.pathname.replace(/\/$/, '') + '/index.html' + url.search;
          }
          next();
        });
      },
    },
  ],
  build: {
    outDir: 'build',
    sourcemap: false,
    manifest: true,
    assetsInlineLimit: 0,
  },
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
});
