const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const httpStatus = require('../constants/httpStatus');
const httpMessages = require('../constants/message');
const userConstant = require('../constants/user-constant');
const { generateAccessToken, generateAccessTokenExpired } = require('../functions/jsonwebtoken');

const assert = chai.assert;

chai.use(chaiHttp);

const ENDPOINT = {
  METHOD: 'GET',
  PATH: '/auth/me',
};

const TOKEN = generateAccessToken({ id: 1, email: 'test@test.com', roleId: 1 });
const TOKEN_EXPIRED = generateAccessTokenExpired({ id: 1, email: 'test@test.com', roleId: 1 });
const TOKEN_USER_NOT_FOUND = generateAccessToken({ id: 999, email: 'test@test.com', roleId: 1 });

describe(`${ENDPOINT.METHOD} ${ENDPOINT.PATH}`, () => {
  describe('Authentication', () => {
    it('token (undefined)', (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.message, httpMessages.FORBIDDEN);

          done();
        });
    });

    it('token (empty)', (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .set('Authorization', '')
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.message, httpMessages.FORBIDDEN);

          done();
        });
    });

    it('token (invalid)', (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .set('Authorization', 'Bearer test')
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.message, httpMessages.FORBIDDEN);

          done();
        });
    });

    it('token (expired)', (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .set('Authorization', `Bearer ${TOKEN_EXPIRED}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.status, httpStatus.FORBIDDEN);
          assert.equal(res.body.message, httpMessages.FORBIDDEN);

          done();
        });
    });

    it('token (user not found)', (done) => {
      chai
        .request(server)
        .get(ENDPOINT.PATH)
        .set('Authorization', `Bearer ${TOKEN_USER_NOT_FOUND}`)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, httpStatus.NOT_FOUND);
          assert.equal(res.body.status, httpStatus.NOT_FOUND);
          assert.equal(res.body.message, httpMessages.NOT_FOUND);

          done();
        });
    });
  });

  it('Successful request', (done) => {
    chai
      .request(server)
      .get(ENDPOINT.PATH)
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, httpStatus.OK);
        assert.equal(res.body.status, httpStatus.OK);
        assert.equal(res.body.message, userConstant.userSuccessMessages.getInfo);

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
