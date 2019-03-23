import * as Router from "koa-router";

import getSearchRoutes from "./search";

function getRouter(storage: any): Router {
  const router = new Router();

  const search = getSearchRoutes(storage);

  router.use("/search", search);

  return router;
}

export default getRouter;
