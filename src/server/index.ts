import * as Koa from "koa";
import router from "src/routes";

function createServer() {
  const server = new Koa();

  server.use(router.allowedMethods());
  server.use(router.routes());

  return server;
}

export default createServer;
