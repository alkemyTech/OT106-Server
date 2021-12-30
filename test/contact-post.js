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
  CREATED_CONTACT,
  BAD_CREATE_CONTACT_REQUEST,
} = require("../constants/contact-constants");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "POST",
  PATH: "/contacts",
};

//Body
const returnBody = (res) => res.body.body;

//Good Request
const goodRequest = {
  name: "New Contact",
  phone: 54110000046,
  email: "newcontact@gmail.com",
  message: "Message for the new contact",
  createdAt: new Date(),
  updatedAt: new Date(),
};

//Request missing data
const badRequest = {
  title: "New Contact",
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("POST a new contact", (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          const body = returnBody(res);
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, CREATED_CONTACT);
          assert.property(body, "id");
          assert.property(body, "name");
          assert.property(body, "phone");
          assert.property(body, "email");
          assert.property(body, "message");
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
        .send(goodRequest)
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
        .send(goodRequest)
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
        .send(goodRequest)
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
          assert.equal(res.body.message, BAD_CREATE_CONTACT_REQUEST);

          done();
        });
    });
  });
});
