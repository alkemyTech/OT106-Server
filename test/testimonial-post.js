const server = require("../app");

//Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
chai.use(chaiHttp);

//TOKEN
const {
  generateAccessToken,
  generateAccessTokenExpired,
} = require("../functions/jsonwebtoken");
const TOKEN = generateAccessToken({ id: 1, email: "test@test.com", roleId: 1 });
const EXPIRED_TOKEN = generateAccessTokenExpired({
  id: 1,
  email: "test@test.com",
  roleId: 1,
});

//Constants files
const code = require("../constants/httpStatus");
const message = require("../constants/message");
const {
  CREATED_TESTIMONIAL,
  TESTIMONIAL_NOT_CREATED,
  BAD_CREATE_TESTIMONIAL_REQUEST,
} = require("../constants/testimonial-constants");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "POST",
  PATH: "/testimonials",
};

//Body
const returnBody = (res) => res.body.body;
const goodRequest = {
  name: "New Testimonial",
  content: "Content for a New Testimonial",
};

//Request missing data
const badRequest = {
  name: "New Testimonial",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("POST a new testimonial", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${TOKEN}`)
        .field("name", JSON.stringify(goodRequest.name))
        .field("content", JSON.stringify(goodRequest.content))
        .attach(
          "image",
          "./test/imgTest/testimonials-test.png",
          "testimonials-test.png"
        )
        .end((err, res) => {
          const body = returnBody(res);
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, CREATED_TESTIMONIAL);
          assert.property(body, "id");
          assert.property(body, "name");
          assert.property(body, "image");
          assert.property(body, "content");
          assert.property(body, "createdAt");
          assert.property(body, "updatedAt");

          done();
        });
    });
  });

  describe("Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .field("name", JSON.stringify(goodRequest.name))
        .field("content", JSON.stringify(goodRequest.content))
        .attach(
          "image",
          "./test/imgTest/testimonials-test.png",
          "testimonials-test.png"
        )
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });

    it("token (expired)", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
        .field("name", JSON.stringify(goodRequest.name))
        .field("content", JSON.stringify(goodRequest.content))
        .attach(
          "image",
          "./test/imgTest/testimonials-test.png",
          "testimonials-test.png"
        )
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });

    it("token (invalid)", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .set("Authorization", "Bearer abcdefghijklmnop")
        .field("name", JSON.stringify(goodRequest.name))
        .field("content", JSON.stringify(goodRequest.content))
        .attach(
          "image",
          "./test/imgTest/testimonials-test.png",
          "testimonials-test.png"
        )
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });

  describe("Middleware Validation", () => {
    it("Missing fields in request body", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.BAD_REQUEST);
          assert.equal(res.body.message, BAD_CREATE_TESTIMONIAL_REQUEST);

          done();
        });
    });
  });
});
