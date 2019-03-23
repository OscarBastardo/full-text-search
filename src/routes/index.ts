import * as Router from 'koa-router';

import getSearchRoutes from './search';

function getRouter(store: any): Router {
  const router = new Router();

  const search = getSearchRoutes(store);

  router.use('/search', search);

  return router;
}

export default getRouter;
