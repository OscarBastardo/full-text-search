import * as Koa from 'koa';

import createServer from './index';

describe('server', () => {
  const store = {};
  it('should create an instance of a Koa server', () => {
    const instance = createServer(store);
    expect(instance).toBeInstanceOf(Koa);
  });
});
