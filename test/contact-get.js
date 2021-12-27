const server = require("../app");

//Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
chai.use(chaiHttp);

//TOKEN
const { generateAccessToken } = require("../functions/jsonwebtoken");
const TOKEN = generateAccessToken({ id: 1, email: "test@test.com", roleId: 1 });

//Constants files
const code = require("../constants/httpStatus");
const message = require("../constants/message");
const {
  GOT_CONTACT,
  CONTACT_NOT_FOUND,
} = require("../constants/contact-constants.js");

//Endpoint method and path
const ENDPOINT = {
  METHOD: "GET",
  PATH: "/contacts",
};

const returnBody = (res) => res.body.body;

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe("Successful responses", () => {
    it("GET All Contacts", (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, GOT_CONTACT);
          returnBody(res).forEach((t) => {
            assert.property(t, "id");
            assert.property(t, "name");
            assert.property(t, "phone");
            assert.property(t, "email");
            assert.property(t, "message");
            assert.property(t, "createdAt");
            assert.property(t, "updatedAt");
            assert.property(t, "deletedAt");
          });

          done();
        });
    });

    it("GET Contact By Id", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/1`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          assert.isNull(err);
          const body = returnBody(res);
          assert.equal(res.status, code.OK);
          assert.equal(res.body.message, GOT_CONTACT);
          assert.property(body, "id");
          assert.property(body, "name");
          assert.property(body, "phone");
          assert.property(body, "email");
          assert.property(body, "message");
          assert.property(body, "createdAt");
          assert.property(body, "updatedAt");
          assert.property(body, "deletedAt");

          done();
        });
    });
  });

  describe("NOT FOUND", () => {
    it("Get Contact By Id", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/999`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.NOT_FOUND);
          assert.equal(res.body.message, CONTACT_NOT_FOUND);

          done();
        });
    });
  });

  describe("GET all Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
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
    //     .get(ENDPOINT.PATH)
    //     .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
    //     .end((err, res) => {
    //       assert.isNull(err);
    //       assert.equal(res.status, code.FORBIDDEN);
    //       assert.equal(res.body.message, message.FORBIDDEN)

    //       done();
    //     });
    // });

    it("token (invalid)", (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .set("Authorization", "Bearer abcdefghijklmnop")
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });

  describe("GET by id Authorization", () => {
    it("token (undefined)", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/1`)
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
    //     .get(`${ENDPOINT.PATH}/1`)
    //     .set("Authorization", `Bearer ${EXPIRED_TOKEN}`)
    //     .end((err, res) => {
    //       assert.isNull(err);
    //       assert.equal(res.status, code.FORBIDDEN);
    //       assert.equal(res.body.message, message.FORBIDDEN)

    //       done();
    //     });
    // });

    it("token (invalid)", (done) => {
      chai
        .request(server)
        .get(`${ENDPOINT.PATH}/1`)
        .set("Authorization", "Bearer abcdefghijklmnop")
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, code.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);

          done();
        });
    });
  });
});
