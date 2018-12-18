const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/search/";

describe("routes : search", () => {

  describe("GET /search", () => {
    it("should return status code 200 and have 'Search on Map' in the body of the response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Search on Map");
        done();
      });
    });
  });

});
