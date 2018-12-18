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
        address: "900 North Point St, San Francisco, CA 94109",
        gender: "All gender",
        accessibility: "Wheelchair",
        facility: "Sink"
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
        expect(body).toContain("Nearby Public Restrooms");
        expect(body).toContain("Ghirardelli Square");
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
          address: "900 North Point St, San Francisco, CA 94109",
          gender: "All gender",
          accessibility: "Wheelchair",
          facility: "Sink"
        }
      };

      it("should create a new restroom information and redirect", (done) => {
        request.post(options,(err, res, body) => {
            Restroom.findOne({where: {title: "Ghirardelli Square"}})
            .then((restroom) => {
              expect(res.statusCode).toBe(303);
              expect(restroom.title).toBe("Ghirardelli Square");
              expect(restroom.address).toBe("900 North Point St, San Francisco, CA 94109");
              expect(restroom.gender).toContain("All gender");
              expect(restroom.accessibility).toContain("Wheelchair");
              expect(restroom.facility).toContain("Sink");
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

    describe("GET /restrooms/:id", () => {

     it("should render a view with the selected restroom information", (done) => {
       request.get(`${base}${this.restroom.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Ghirardelli Square");
         done();
       });
     });
   });

   describe("POST /restrooms/:id/destroy", () => {

     it("should delete the restroom information with the associated ID", (done) => {
       Restroom.all()
       .then((restrooms) => {
         const restroomCountBeforeDelete = restrooms.length;

         expect(restroomCountBeforeDelete).toBe(1);
         request.post(`${base}${this.restroom.id}/destroy`, (err, res, body) => {
           Restroom.all()
           .then((restrooms) => {
             expect(err).toBeNull();
             expect(restrooms.length).toBe(restroomCountBeforeDelete - 1);
             done();
           })
         });
       });
     });
   });

   describe("GET /restrooms/:id/edit", () => {

     it("should render a view with an edit restroom information form", (done) => {
       request.get(`${base}${this.restroom.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Restroom Information");
         expect(body).toContain("Ghirardelli Square");
         done();
       });
     });
   });

   describe("POST /restrooms/:id/update", () => {

     it("should update the restroom information with the given values", (done) => {
       const options = {
          url: `${base}${this.restroom.id}/update`,
          form: {
            title: "Ghirardelli Chocolate",
            address: "900 North Point St, San Francisco, CA 94109",
            gender: "All gender",
            accessibility: "Wheelchair",
            facility: "Sink"
          }
        };
        request.post(options,(err, res, body) => {
          expect(err).toBeNull();
          Restroom.findOne({
            where: { id: this.restroom.id }
          })
          .then((restroom) => {
            expect(restroom.title).toBe("Ghirardelli Chocolate");
            done();
          });
        });
      });
    });

});
