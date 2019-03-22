import * as Router from "koa-router";

import search from "./search";

const router = new Router();

router.use("/search", search);

export default router;
