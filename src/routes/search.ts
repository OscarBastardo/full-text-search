import * as Router from 'koa-router';

import { getSearchController } from 'src/controllers';

function getSearchRoutes(store: any) {
  const router = new Router();
  const searchController = getSearchController(store);

  router.get('/', (ctx) => {
    try {
      ctx.status = 200;
      const results = searchController.search(ctx.query.query);
      if (!results.length) {
        ctx.status = 204;
      }
      ctx.body = results;
    } catch (err) {
      throw new Error(err);
    }
});

  return router.routes();
}

export default getSearchRoutes;
