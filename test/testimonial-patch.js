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
  BAD_UPDATE_TESTIMONIAL_REQUEST,
  UPDATED_TESTIMONIAL,
  TESTIMONIAL_NOT_FOUND,
} = require("../constants/testimonial-constants");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "PATCH",
  PATH: "/testimonials",
};

//Good Request
const goodRequest = {
  name: "Testimonial name updated",
};

//Bad Request, no valid fields
const badRequest = {
  title: "Testimonial name updated",
};

//Body
const returnBody = (res) => res.body.body;

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("PATCH a new testimonial", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/10`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          const body = returnBody(res);
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.property(body, "id");
          assert.property(body, "name");
          assert.property(body, "image");
          assert.property(body, "content");
          assert.property(body, "createdAt");
          assert.property(body, "updatedAt");
          assert.equal(res.body.message, UPDATED_TESTIMONIAL(10));

          done();
        });
    });
  });

  describe("Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/10`)
        .send(goodRequest)
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
    //     .patch(`${ENDPOINT.PATH}/1`)
    //     .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
    //     .send(goodRequest)
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
        .patch(`${ENDPOINT.PATH}/10`)
        .set("Authorization", "Bearer abcdefghijklmnop")
        .send(goodRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });

  describe("Validation", () => {
    it("Missing fields in request body", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/10`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.BAD_REQUEST);
          assert.equal(res.body.message, BAD_UPDATE_TESTIMONIAL_REQUEST);

          done();
        });
    });
  });

  describe("Testimonial NOT FOUND", () => {
    it("Testimonial id NOT FOUND", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/999`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.NOT_FOUND);
          assert.equal(res.body.message, TESTIMONIAL_NOT_FOUND);

          done();
        });
    });
  });
});
