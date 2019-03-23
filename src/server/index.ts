import * as Koa from 'koa';

import getRouter from 'src/routes';

function createServer(store) {
  const server = new Koa();

  const router = getRouter(store);

  server.use(router.allowedMethods());
  server.use(router.routes());

  return server;
}

export default createServer;
