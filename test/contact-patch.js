const server = require("../app");

//Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
chai.use(chaiHttp);

//TOKEN
const { generateAccesToken } = require("../functions/jsonwebtoken");
const TOKEN = generateAccesToken({ id: 1, email: "test@test.com", roleId: 1 });

//Constants files
const code = require("../constants/httpStatus");
const message = require("../constants/message");
const {
  BAD_UPDATE_CONTACT_REQUEST,
  UPDATED_CONTACT,
  CONTACT_NOT_FOUND,
} = require("../constants/contact-constants");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "PATCH",
  PATH: "/contacts",
};

//Good Request
const goodRequest = {
  name: "Contact name updated",
};

//Bad Request, no valid fields
const badRequest = {
  title: "Contact name updated",
};

//Body
const returnBody = (res) => res.body.body;

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful response", () => {
    it("PATCH a new contact", (done) => {
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
          assert.property(body, "phone");
          assert.property(body, "email");
          assert.property(body, "message");
          assert.property(body, "createdAt");
          assert.property(body, "updatedAt");
          assert.equal(res.body.message, UPDATED_CONTACT(10));

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
          assert.equal(res.text, message.FORBIDDEN);

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
    //       assert.equal(res.text, message.FORBIDDEN);

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
          assert.equal(res.text, message.FORBIDDEN);

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
          assert.equal(res.body.message, BAD_UPDATE_CONTACT_REQUEST);

          done();
        });
    });
  });

  describe("Contact NOT FOUND", () => {
    it("Contact id NOT FOUND", (done) => {
      chai
        .request(server)
        .patch(`${ENDPOINT.PATH}/999`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.NOT_FOUND);
          assert.equal(res.body.message, CONTACT_NOT_FOUND);

          done();
        });
    });
  });
});
