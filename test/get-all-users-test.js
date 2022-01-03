const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const status = require('../constants/httpStatus');
const message = require('../constants/message');
const { generateAccessToken, generateAccessTokenExpired } = require('../functions/jsonwebtoken');

const assert = chai.assert;

const PATH = '/users';

const adminUserToken = generateAccessToken({ id: 1, email: 'test@test.com', roleId: 1 });
const standardUserToken = generateAccessToken({ id: 1, email: 'test@test.com', roleId: 2 });
const expiredToken = generateAccessTokenExpired({ id: 1, email: 'test@test.com', roleId: 1 });

chai.use(chaiHttp);

describe('Get all users', () => {
  describe('succesfully', () => {
    it('when user is admin', done => {
      chai
        .request(server)
        .get(PATH)
        .set('Authorization', `Bearer ${adminUserToken}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.OK);
          assert.isArray(res.body);
        });

      done();
    });
  });

  describe('fails', () => {
    it('when user is not admin', done => {
      chai
        .request(server)
        .get(PATH)
        .set('Authorization', `Bearer ${standardUserToken}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.FORBIDDEN);
          assert.equal(res.body.status, status.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);
        });

      done();
    });

    it('when request not contains token', done => {
      chai
        .request(server)
        .get(PATH)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.FORBIDDEN);
          assert.equal(res.body.status, status.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);
        });

      done();
    });

    it('when token is invalid', done => {
      chai
        .request(server)
        .get(PATH)
        .set('Authorization', 'Bearer invalidtoken')
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, status.FORBIDDEN);
          assert.equal(res.body.status, status.FORBIDDEN);
          assert.equal(res.body.message, message.FORBIDDEN);
        });

      done();
    });

    it('when token has expired', done => {
     chai
       .request(server)
       .get(PATH)
       .set('Authorization', `Bearer ${expiredToken}`)
       .end((err, res) => {
         assert.isNull(err);
         assert.equal(res.status, status.FORBIDDEN);
         assert.equal(res.body.status, status.FORBIDDEN);
         assert.equal(res.body.message, message.FORBIDDEN);
       });
    
     done();
    });
  });
});
