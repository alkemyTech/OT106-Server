const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const status = require('../constants/httpStatus');

const assert = chai.assert;

const PATH = '/users';

const createUser = (firstName, lastName, email, password) => {
  return Object.assign({}, { firstName, lastName, email, password });
};

chai.use(chaiHttp);

describe('Create user', () => {
  describe('succesfully', () => {
    it('when user format is valid', done => {
      const user = createUser('testFirst', 'testLast', 'email@gmail.com', 'password1234')

      chai
        .request(server)
        .post(PATH)
        .send(user)
        .end((err, res) => {
          const userInBody = res.body;
          assert.isNull(err);
          assert.equal(res.status, status.CREATED);
          assert.equal(user.firstName, userInBody.firstName);
          assert.equal(user.lastName, userInBody.lastName);
          assert.equal(user.email, userInBody.email);
          assert.isNumber(userInBody.id);
          assert.notProperty(userInBody, 'password');
        });

      done();
    });
  });

  describe('fails', () => {
    it('when user first name format is invalid', done => {
      const user = createUser('', 'testLast', 'email@gmail.com', 'password1234');

      chai
        .request(server)
        .post(PATH)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.BAD_REQUEST);
          assert.property(res.body, 'errors');
          assert.isArray(res.body.errors);
        });

      done();
    });

    it('when user last name format is invalid', done => {
      const user = createUser('testfirs', '', 'email@gmail.com', 'password1234');

      chai
        .request(server)
        .post(PATH)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.BAD_REQUEST);
          assert.property(res.body, 'errors');
          assert.isArray(res.body.errors);
        });

      done();
    });

    it('when user last name format is invalid', done => {
        const user = createUser('testfirs', '', 'email@gmail.com', 'password1234');
  
        chai
          .request(server)
          .post(PATH)
          .send(user)
          .end((err, res) => {
            assert.isNull(err);
            assert.equal(res.status, status.BAD_REQUEST);
            assert.property(res.body, 'errors');
            assert.isArray(res.body.errors);
          });
  
        done();
    });

    it('when user email format is invalid', done => {
      const user = createUser('testfirst', 'testlast', 'emailgmail.com', 'password1234');

      chai
        .request(server)
        .post(PATH)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.BAD_REQUEST);
          assert.property(res.body, 'errors');
          assert.isArray(res.body.errors);
        });

      done();
  });

  it('when user email is empty', done => {
    const user = createUser('testfirst', 'testlast', '', 'password1234');

    chai
      .request(server)
      .post(PATH)
      .send(user)
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, status.BAD_REQUEST);
        assert.property(res.body, 'errors');
        assert.isArray(res.body.errors);
      });

    done();
  });

    it('when user password format is invalid', done => {
      const user = createUser('testfirst', 'testlast', 'email@gmail.com', 'pass');

      chai
        .request(server)
        .post(PATH)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.BAD_REQUEST);
          assert.property(res.body, 'errors');
          assert.isArray(res.body.errors);
        });

      done();
    });

    it('when user password is empty', done => {
      const user = createUser('testfirst', 'testlast', 'email@gmail.com', '');

      chai
        .request(server)
        .post(PATH)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.BAD_REQUEST);
          assert.property(res.body, 'errors');
          assert.isArray(res.body.errors);
        });

      done();
    });
  });
});