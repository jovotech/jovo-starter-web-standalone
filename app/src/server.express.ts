import { ExpressJs, Request, Response, Webhook } from '@jovotech/server-express';
import cors from 'cors';
import { app } from './app';

/*
|--------------------------------------------------------------------------
| EXPRESS SERVER CONFIGURATION
|--------------------------------------------------------------------------
|
| Creates a new express app instance, default for local development
| Learn more here: www.jovo.tech/docs/server/express
|
*/
const port = process.env.JOVO_PORT || 3000;
(async () => {
  if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
    return;
  }

  Webhook.use(cors());

  await app.initialize();
  Webhook.listen(port, () => {
    console.info(`Local server listening on port ${port}.`);
  });
  Webhook.get('/webhook', async (req: Request, res: Response) => {
    const response = await app.handle(new ExpressJs(req, res));
    res.json(response);
  });
  Webhook.post('/webhook', async (req: Request, res: Response) => {
    await app.handle(new ExpressJs(req, res));
  });
})();
