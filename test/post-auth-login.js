const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const httpStatus = require('../constants/httpStatus');
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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.email.invalid
          );
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.email.unregistered
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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.email.invalid
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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.email.invalid
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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.email.invalid
          );

          done();
        });
    });

    it('email (unregistered)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'test@test.com', password: '12345678' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.NOT_FOUND);
          assert.equal(res.body.status, httpStatus.NOT_FOUND);
          assert.equal(res.body.message, userConstants.userFailureMessages.notFound);

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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.password.invalid
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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.password.invalid
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
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.message, userConstants.userFailureMessages.validation);
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.password.invalid
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
          assert.equal(res.body.status, httpStatus.UNAUTHORIZED);
          assert.equal(res.body.message, userConstants.userFailureMessages.wrongPassword);
          assert.equal(res.body.body.ok, false);

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
        assert.equal(res.body.status, httpStatus.OK);
        assert.equal(res.body.message, userConstants.userSuccessMessages.login);

        assert.property(res.body.body, 'id');
        assert.property(res.body.body, 'firstName');
        assert.property(res.body.body, 'lastName');
        assert.property(res.body.body, 'email');
        assert.property(res.body.body, 'photo');
        assert.property(res.body.body, 'roleId');
        assert.property(res.body.body, 'token');
        assert.property(res.body.body, 'createdAt');
        assert.property(res.body.body, 'updatedAt');
        assert.property(res.body.body, 'deletedAt');

        done();
      });
  });
});
