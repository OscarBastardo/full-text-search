import * as Router from "koa-router";

const router = new Router();

router.get("/", (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = {};
  } catch (err) {
    throw new Error(err);
  }
});

export default router.routes();
