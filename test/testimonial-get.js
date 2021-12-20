const server = require("../app");

//Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
chai.use(chaiHttp);

const code = require("../constants/httpStatus");
const {
  GOT_TESTIMONIAL,
  TESTIMONIAL_NOT_FOUND,
} = require("../constants/testimonial-constants");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "GET",
  PATH: "/testimonials",
};

const returnBody = (res) => res.body.body;

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful responses", () => {
    it("GET All Testimonials", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/?page=2`)
        .end((err, res) => {
          assert.isNull(err);
          const body = returnBody(res);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, GOT_TESTIMONIAL);
          assert.property(body, "totalPages");
          assert.property(body, "rows");
          body.rows.forEach((t) => {
            assert.property(t, "id");
            assert.property(t, "name");
            assert.property(t, "image");
            assert.property(t, "content");
            assert.property(t, "createdAt");
            assert.property(t, "updatedAt");
            assert.property(t, "deletedAt");
          });
          assert.property(body, "previousPage");
          assert.property(body, "nextPage");
          done();
        });
    });

    it("GET Testimonial By Id", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/1`)
        .end((err, res) => {
          assert.isNull(err);
          const body = returnBody(res);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, GOT_TESTIMONIAL);
          assert.property(body, "id");
          assert.property(body, "name");
          assert.property(body, "image");
          assert.property(body, "content");
          assert.property(body, "createdAt");
          assert.property(body, "updatedAt");
          assert.property(body, "deletedAt");

          done();
        });
    });
  });

  describe("NOT FOUND", () => {
    it("Get Testimonial By Id", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/999`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.NOT_FOUND);
          assert.equal(res.body.message, TESTIMONIAL_NOT_FOUND);

          done();
        });
    });

    it("Get All Testimonials", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/?page=999`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.NOT_FOUND);
          assert.equal(res.body.message, TESTIMONIAL_NOT_FOUND);

          done();
        });
    });
  });
});
