import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startKernelServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Technical Health & Kernel Status Endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'operational',
      kernel: 'OB/NBE Regulatory Reporting Kernel',
      role: 'Landing Pad for Application Source Import',
      version: '0.1.0',
      environment: isProduction ? 'production' : 'development',
      serverTime: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      landingPadReady: true,
      runtime: {
        node: process.version,
        platform: process.platform,
      },
    });
  });

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[OB/NBE Kernel] Full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startKernelServer().catch((err: unknown) => {
  console.error('[OB/NBE Kernel] Fatal server startup failure:', err);
  process.exit(1);
});
