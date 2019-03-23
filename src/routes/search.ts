import * as Router from 'koa-router';

function getSearchRoutes(store: any) {
  const router = new Router();

  router.get('/', (ctx) => {
    try {
      ctx.status = 200;
      const results = search(ctx.query.query, store);
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

function search(query: string, store: any) {
  const searchResults: any[] = store.search(query);
  const results = searchResults.map(({ id, body, link }) => ({ id, body, link }));
  return results;
}

export default getSearchRoutes;
