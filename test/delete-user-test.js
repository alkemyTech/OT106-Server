const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const status = require('../constants/httpStatus');
const { generateAccessToken } = require('../functions/jsonwebtoken');

const assert = chai.assert;

const PATH = '/users';

const adminUserToken = generateAccessToken({ id: 1, email: 'test1@test.com', roleId: 1 });
const standardUserToken = generateAccessToken({ id: 20, email: 'test2@test.com', roleId: 2 });
const thisIsNotMe = generateAccessToken({ id: 3, email: 'test3@test.com', roleId: 2 });

chai.use(chaiHttp);

describe('Delete user', () => {
  describe('fails', () => {
    it('when user is invalid', done => {
      chai
        .request(server)
        .delete(`${PATH}/20`)
        .set('Authorization', `Bearer ${thisIsNotMe}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.FORBIDDEN);
        });

        done();
    });

    it('when request not contains token', done => {
        chai
          .request(server)
          .delete(`${PATH}/20`)
          .end((err, res) => {
            assert.isNull(err);
            assert.equal(res.status, status.FORBIDDEN);
          });
  
          done();
      });

      it('when token is invalid', done => {
        chai
          .request(server)
          .delete(`${PATH}/20`)
          .set('Authorization', 'invalidtoken')
          .end((err, res) => {
            assert.isNull(err);
            assert.equal(res.status, status.FORBIDDEN);
          });
  
          done();
      });
  });

  describe('succesfully', () => {
    it('when token is valid', done => {
        chai
        .request(server)
        .delete(`${PATH}/20`)
        .set('Authorization', `Bearer ${standardUserToken}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.OK);
        });

        done();
    });

    it('when user is admin', done => {
        chai
        .request(server)
        .delete(`${PATH}/21`)
        .set('Authorization', `Bearer ${adminUserToken}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.OK);
        });

        done();
    });
  });
});
