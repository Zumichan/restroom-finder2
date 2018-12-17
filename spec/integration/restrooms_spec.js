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

  describe("GET /restrooms/new", () => {
    it("should render a new restroom information page", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Restroom Information");
        done();
      })
    })
  })

  describe("POST /restrooms/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Ghirardelli Square",
          address: "North Point St, San Francisco, CA"
        }
      };

      it("should create a new restroom information and redirect", (done) => {
        request.post(options,(err, res, body) => {
            Restroom.findOne({where: {title: "Ghirardelli Square"}})
            .then((restroom) => {
              expect(res.statusCode).toBe(303);
              expect(restroom.title).toBe("Ghirardelli Square");
              expect(restroom.address).toBe("North Point St, San Francisco, CA");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

});
