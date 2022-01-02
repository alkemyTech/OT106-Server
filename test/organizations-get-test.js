const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const status = require('../constants/httpStatus');

const assert = chai.assert;
const path = '/organizations/public';

chai.use(chaiHttp);


describe('Organization suite test', () => {
  describe('Test for GET methods', () => {
    it('Find All - Valid request. Should response 200.', (done) => {
      chai
        .request(app)
        .get(path)
        .end((err, res) => {
          assert.equal(res.status, status.OK);
        });
      done();
    });

    it('Find organization by Id - Valid request. Should response 200.', (done) => {
      chai
        .request(app)
        .get(`${path}/4`)
        .end((err, res) => {
          assert.equal(res.status, status.OK);
        });
      done();
    });
  });
});
