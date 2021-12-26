const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const httpStatus = require('../constants/httpStatus');
const httpMessages = require('../constants/message');
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

        assert.property(res.body, 'id');
        assert.property(res.body, 'firstName');
        assert.property(res.body, 'lastName');
        assert.property(res.body, 'email');
        assert.property(res.body, 'photo');
        assert.property(res.body, 'roleId');
        // assert.property(res.body, 'token'); // FIXME: make the response have a token property
        assert.property(res.body, 'createdAt');
        assert.property(res.body, 'updatedAt');
        assert.property(res.body, 'deletedAt');

        done();
      });
  });
});
