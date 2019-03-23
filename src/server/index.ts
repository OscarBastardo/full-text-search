import * as Koa from "koa";
import * as Router from "koa-router";

import getRouter from "src/routes";

function createServer(storage) {
  const server = new Koa();

  const router = getRouter(storage);

  server.use(router.allowedMethods());
  server.use(router.routes());

  return server;
}

export default createServer;
