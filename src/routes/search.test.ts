import * as request from 'supertest';
import createServer from 'src/server';

describe('GET /search', () => {
  it('should respond 200 OK with search results', async () => {
    const storeMock = {
      search: () => [
        {
          id: 1,
          body: 'mock search result number one',
          link: 'http://one.link.com',
        },
        {
          id: 2,
          body: 'mock search result number two',
          link: 'http://two.link.com',
        },
        {
          id: 3,
          body: 'mock search result number three',
          link: 'http://three.link.com',
        },
      ],
    };
    const server = createServer(storeMock);
    const app = server.listen(5000);
    const response = await request(app).get('/search');
    const results = response.body;
    const result = results[0];
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(Array.isArray(results)).toEqual(true);
    expect(typeof result).toEqual('object');
    expect(Object.keys(result).sort()).toEqual(['body', 'id', 'link']);
    app.close();
  });

  it('should respond 204 No Content with no search results', async () => {
    const storeMock = {
      search: () => [],
    };
    const server = createServer(storeMock);
    const app = server.listen(5000);
    const response = await request(app).get('/search');
    const results = response.body;
    expect(response.status).toEqual(204);
    expect(response.type).toEqual('');
    expect(results).toEqual({});
    app.close();
  });
});
