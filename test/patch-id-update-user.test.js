const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const status = require('../constants/httpStatus');

const assert = chai.assert;

const PATH = '/users';

const updateUserWithPassword = (firstName, lastName, email, password) => {
  return Object.assign({}, { firstName, lastName, email, password });
};

const updateUserWithoutPassword = (firstName, lastName, email) => {
  return Object.assign({}, { firstName, lastName, email });
};

const adminUserToken = generateAccesToken({ id: 1, email: 'test1@test.com', roleId: 1 });
const standardUserToken = generateAccesToken({ id: 2, email: 'test2@test.com', roleId: 2 });
const thisIsNotMe = generateAccesToken({ id: 3, email: 'test3@test.com', roleId: 2 });

chai.use(chaiHttp);

describe('Update user', () => {
  describe('succesfully', () => {
    it('when user format is valid', done => {
      const user = updateUserWithoutPassword('testFirst', 'testLast', 'email@gmail.com');

      chai
          .request(server)
          .post(`${PATH}/2`)
          .set('Authorization', `Bearer ${standardUserToken}`)
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

    it('when user format is valid and contains password', done => {
      const user = updateUserWithPassword('testFirst', 'testLast', 'email@gmail.com', 'password1234');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${standardUserToken}`)
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

    it('when the request is made by an admin', done => {
        const user = updateUserWithoutPassword('testFirst', 'testLast', 'email@gmail.com');
  
        chai
            .request(server)
            .post(`${PATH}/2`)
            .set('Authorization', `Bearer ${adminUserToken}`)
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
      const user = updateUserWithoutPassword('', 'testLast', 'email@gmail.com');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${standardUserToken}`)
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
      const user = updateUserWithoutPassword('testfirst', '', 'email@gmail.com', 'password1234');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${standardUserToken}`)
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
      const user = updateUserWithoutPassword('testfirst', 'testlast', 'emailgmail.com');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${standardUserToken}`)
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
    const user = updateUserWithoutPassword('testfirst', 'testlast', '');

    chai
      .request(server)
      .post(`${PATH}/2`)
      .set('Authorization', `Bearer ${standardUserToken}`)
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
      const user = updateUserWithPassword('testfirst', 'testlast', 'email@gmail.com', 'pass');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${standardUserToken}`)
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
      const user = updateUserWithPassword('testfirst', 'testlast', 'email@gmail.com', '');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${standardUserToken}`)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.BAD_REQUEST);
          assert.property(res.body, 'errors');
          assert.isArray(res.body.errors);
        });

      done();
    });

    it('when user is invalid', done => {
      const user = updateUserWithoutPassword('testFirst', 'testLast', 'email@gmail.com');

      chai
        .request(server)
        .post(`${PATH}/2`)
        .set('Authorization', `Bearer ${thisIsNotMe}`)
        .send(user)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.FORBIDDEN);
        });

      done();
    });
  });
});
