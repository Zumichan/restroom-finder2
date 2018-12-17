const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/restrooms/";
const sequelize = require("../../src/db/models/index").sequelize;
const Restroom = require("../../src/db/models").Restroom;

describe("routes : restrooms", () => {

  beforeEach((done) => {
    this.restroom;
    sequelize.sync({force: true}).then((res) => {
      Restroom.create({
        title: "Ghirardelli Square",
        //address: "900 North Point St, San Francisco, CA 94109",
        //gender: "All gender",
        //accessibility: "Wheelchair",
        //facility: "Sink"
      })
      .then((restroom) => {
        this.restroom = restroom;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

  describe("GET /restrooms", () => {

    it("should return a status code 200 and all restrooms", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Ghirardelli Square");
        //expect(body).toContain("900 North Point St, San Francisco, CA 94109");
        //expect(body).toContain("All gender");
        //expect(body).toContain("Wheelchair");
        //expect(body).toContain("Sink");
        done();
      });
    });
  });

});
