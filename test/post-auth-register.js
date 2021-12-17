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

          assert.isArray(res.body.errors);
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.invalidFirstName
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

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidFirstName
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

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidFirstName
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

          assert.isArray(res.body.errors);
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.invalidLastName
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

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidLastName
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

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.invalidLastName
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

          assert.isArray(res.body.errors);
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.invalidEmail
          );
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.registeredEmail
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

    it('email (registered)', (done) => {
      chai
        .request(server)
        .post(ENDPOINT.PATH)
        .send({ email: 'lm10@afa.com' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.BAD_REQUEST);

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.registeredEmail
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

          assert.isArray(res.body.errors);
          assert.notInclude(
            res.body.errors,
            userConstants.userValidation.shortPassword
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
            userConstants.userValidation.shortPassword
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
            userConstants.userValidation.shortPassword
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

          assert.isArray(res.body.errors);
          assert.include(
            res.body.errors,
            userConstants.userValidation.shortPassword
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
          roleId: 2, // FIXME: make roleId=2 the default
        })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.CREATED);

          assert.isNotNull(res.body.id);
          assert.equal(res.body.firstName, 'testA');
          assert.equal(res.body.lastName, 'testB');
          assert.equal(res.body.email, 'testA@test.com');
          // assert.isNull(res.body.photo); // FIXME: make the response have a photo property
          assert.equal(res.body.roleId, 2);
          assert.isNotNull(res.body.token);
          assert.isNotNull(res.body.createdAt);
          assert.isNotNull(res.body.updatedAt);
          // assert.isNull(res.body.deletedAt); // FIXME: make the response have a deleteAt property

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
          roleId: 2, // FIXME: make roleId=2 the default
        })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.CREATED);

          assert.isNotNull(res.body.id);
          assert.equal(res.body.firstName, 'testA');
          assert.equal(res.body.lastName, 'testB');
          assert.equal(res.body.email, 'testB@test.com');
          // assert.equal(
          //   res.body.photo,
          //   'https://dummyimage.com/100/000/fff.jpg'
          // ); // FIXME: make the response have a photo property
          assert.equal(res.body.roleId, 2);
          assert.isNotNull(res.body.token);
          assert.isNotNull(res.body.createdAt);
          assert.isNotNull(res.body.updatedAt);
          // assert.isNull(res.body.deletedAt); // FIXME: make the response have a deleteAt property

          done();
        });
    });
  });
});
