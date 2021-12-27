const server = require("../app");

//Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
chai.use(chaiHttp);

//TOKEN
const { generateAccessToken } = require("../functions/jsonwebtoken");
const TOKEN = generateAccessToken({ id: 1, email: "test@test.com", roleId: 1 });

//Constants files
const code = require("../constants/httpStatus");
const message = require("../constants/message");
const {
  DELETED_TESTIMONIAL,
  TESTIMONIAL_NOT_FOUND,
} = require("../constants/testimonial-constants");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "DELETE",
  PATH: "/testimonials",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("DELETE a new testimonial", (done) => {
      chai
        .request(server)
        .delete(`${ENDPOINT.PATH}/1`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, DELETED_TESTIMONIAL(1));

          done();
        });
    });
  });

  describe("Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .delete(`${ENDPOINT.PATH}/2`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });

    // TODO: Generate expired Token
    // it("token (expired)", (done) => {
    //   chai
    //     .request(server)
    //     .delete(`${ENDPOINT.PATH}/3`)
    //     .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
    //     .end((err, res) => {
    //       assert.isNull(err);
    //       assert.equal(res.status, code.FORBIDDEN);
    //       assert.equal(res.body.message, message.FORBIDDEN);

    //       done();
    //     });
    // });

    it("token (invalid)", (done) => {
      chai
        .request(server)
        .delete(`${ENDPOINT.PATH}/4`)
        .set("Authorization", "Bearer abcdefghijklmnop")
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });

  describe("Testimonial NOT FOUND", () => {
    it("Testimonial id NOT FOUND", (done) => {
      chai
        .request(server)
        .delete(`${ENDPOINT.PATH}/999`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.NOT_FOUND);
          assert.equal(res.body.message, TESTIMONIAL_NOT_FOUND);

          done();
        });
    });
  });
});
