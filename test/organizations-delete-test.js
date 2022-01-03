const chai = require('chai');
const chaiHttp = require('chai-http');

// intancia del servidor
const app = require('../app');
const status = require('../constants/httpStatus');
const { generateAccessToken } = require('../functions/jsonwebtoken');

const assert = chai.assert;
const path = '/organizations/public';

const token = generateAccessToken({ id: 67, email: 'fa@afa.com', roleId: 1 });

chai.use(chaiHttp);


describe('Organization suite test', () => {
  describe('Suite test for DELETE', () => {
    it('Delete Organization - Invalid request, missing token. Should response 403.', (done) => {
      chai
              .request(app)
              .delete(`${path}/4`)
              .end((err, res) => {
                assert.equal(res.status, status.FORBIDDEN);
              });
      done();
    });

    it('Delete Organization - Invalid request, Id not exists. Should response 404.', (done) => {
      chai
                .request(app)
                .delete(`${path}/999`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                  assert.equal(res.status, status.NOT_FOUND);
                });
      done();
    });


    it('Delete Organization - Valid request. Should response 200.', (done) => {
      chai
                    .request(app)
                    .delete(`${path}/4`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                      assert.equal(res.status, status.OK);
                    });
      done();
    });
  });
});

