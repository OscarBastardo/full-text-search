import * as Koa from "koa";

import createServer from "./index";

describe("server", () => {
  it("should create an instance of a Koa server", () => {
    const instance = createServer();
    expect(instance).toBeInstanceOf(Koa);
  });
});
