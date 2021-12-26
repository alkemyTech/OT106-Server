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
  PATH: '/auth/register',
};

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe('Validations', () => {
    it('firstName', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ firstName: 'test' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.firstName.invalid
          );

          done();
        });
    });

    it('firstName (undefined)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.firstName.invalid
          );

          done();
        });
    });

    it('firstName (empty)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ firstName: '' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.firstName.invalid
          );

          done();
        });
    });

    it('lastName', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ lastName: 'test' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.lastName.invalid
          );

          done();
        });
    });

    it('lastName (undefined)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.lastName.invalid
          );

          done();
        });
    });

    it('lastName (empty)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ lastName: '' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.lastName.invalid
          );

          done();
        });
    });

    it('email', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.email.invalid
          );
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.email.registered
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
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
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
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
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
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.email.invalid
          );

          done();
        });
    });

    it('email (registered)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'lm10@afa.com' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.email.registered
          );

          done();
        });
    });

    it('password', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ password: '12345678' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.notInclude(
            res.body.body,
            userConstants.userValidationMessages.password.short
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
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.password.short
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
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.password.short
          );

          done();
        });
    });

    it('password (short)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ password: '1234567' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);
          assert.equal(res.body.status, httpStatus.BAD_REQUEST);
          assert.equal(
            res.body.message,
            userConstants.userFailureMessages.validation
          );
          assert.include(
            res.body.body,
            userConstants.userValidationMessages.password.short
          );

          done();
        });
    });
  });

  describe('Successful registration', () => {
    it('photo (undefined)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({
          firstName: 'testA',
          lastName: 'testB',
          email: 'testA@test.com',
          password: '12345678',
        })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.CREATED);
          assert.equal(res.body.status, httpStatus.CREATED);
          assert.equal(
            res.body.message,
            userConstants.userSuccessMessages.register
          );

          assert.isNotNull(res.body.body.id);
          assert.equal(res.body.body.firstName, 'testA');
          assert.equal(res.body.body.lastName, 'testB');
          assert.equal(res.body.body.email, 'testA@test.com');
          assert.isNull(res.body.body.photo);
          assert.equal(res.body.body.roleId, 2);
          assert.isNotNull(res.body.body.token);
          assert.isNotNull(res.body.body.createdAt);
          assert.isNotNull(res.body.body.updatedAt);
          assert.isNull(res.body.body.deletedAt);

          done();
        });
    });

    it('all properties', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({
          firstName: 'testA',
          lastName: 'testB',
          email: 'testB@test.com',
          password: '12345678',
          photo: 'https://dummyimage.com/100/000/fff.jpg',
        })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.CREATED);
          assert.equal(res.body.status, httpStatus.CREATED);
          assert.equal(
            res.body.message,
            userConstants.userSuccessMessages.register
          );

          assert.isNotNull(res.body.id);
          assert.equal(res.body.body.firstName, 'testA');
          assert.equal(res.body.body.lastName, 'testB');
          assert.equal(res.body.body.email, 'testB@test.com');
          assert.equal(
            res.body.body.photo,
            'https://dummyimage.com/100/000/fff.jpg'
          );
          assert.equal(res.body.body.roleId, 2);
          assert.isNotNull(res.body.body.token);
          assert.isNotNull(res.body.body.createdAt);
          assert.isNotNull(res.body.body.updatedAt);
          assert.isNull(res.body.body.deletedAt);

          done();
        });
    });
  });
});
