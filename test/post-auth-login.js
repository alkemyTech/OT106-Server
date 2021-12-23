const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const httpStatus = require('../constants/httpStatus');
const httpMessages = require('../constants/message');
const userConstants = require('../constants/user-constant');

const assert = chai.assert;

chai.use(chaiHttp);

const ENDPOINT = {
  METHOD: 'POST',
  PATH: '/auth/login',
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe('Validations', () => {
    it('email', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'lm10@afa.com' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.invalidEmail
          );
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.unregisteredEmail
          );

          done();
        });
    });

    it('email (undefined)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidEmail
          );

          done();
        });
    });

    it('email (empty)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: '' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidEmail
          );

          done();
        });
    });

    it('email (not email)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'test' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidEmail
          );

          done();
        });
    });

    it('email (unregistered)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.unregisteredEmail
          );

          done();
        });
    });

    it('password', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ password: 'test' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.invalidPassword
          );

          done();
        });
    });

    it('password (undefined)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidPassword
          );

          done();
        });
    });

    it('password (empty)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ password: '' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidPassword
          );

          done();
        });
    });

    it('password (wrong)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'lm10@afa.com', password: 'test' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.UNAUTHORIZED);

          assert.equal(res.body.ok, false);

          done();
        });
    });
  });

  it('Successful login', (done) => {
    chai
      .request(server)
      .post(ENDPOINT.PATH)
      .send({ email: 'lm10@afa.com', password: '12345678' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, httpStatus.OK);

        assert.property(res.body.dataValues, 'id');
        assert.property(res.body.dataValues, 'firstName');
        assert.property(res.body.dataValues, 'lastName');
        assert.property(res.body.dataValues, 'email');
        assert.property(res.body.dataValues, 'photo');
        assert.property(res.body.dataValues, 'roleId');
        assert.property(res.body, 'token');
        assert.property(res.body.dataValues, 'createdAt');
        assert.property(res.body.dataValues, 'updatedAt');
        assert.property(res.body.dataValues, 'deletedAt');

        done();
      });
  });
});
