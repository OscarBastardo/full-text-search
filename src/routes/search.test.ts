import * as request from "supertest";
import createServer from "src/server";

const server = createServer();
const app = server.listen(5000);

describe("GET /search", () => {
  it("should respond with search results", async () => {
    const response = await request(app).get("/search");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body);
  });
});
