const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const status = require('../constants/httpStatus');
const { generateAccessToken } = require('../functions/jsonwebtoken');

const assert = chai.assert;
const path = '/organizations/public';

const token = generateAccessToken({ id: 67, email: 'fa@afa.com', roleId: 1 });

chai.use(chaiHttp);


describe('Organization suit test', () => {
  describe('Suite test for POST', () => {
    it('Create new Organization - Invalid request, missing token. Should response 403.', (done) => {
      chai
              .request(app)
              .post(`${path}`)
              .send({
                name: '',
                image: '',
                address: '',
                phone: '',
                email: '',
                welcomeText: '',
                aboutUsText: ''
              })
              .end((err, res) => {
                assert.equal(res.status, status.FORBIDDEN);
              });
      done();
    });


    it('Create new Organization - Invalid request, missing required fields. Should response 400.', (done) => {
      chai
                  .request(app)
                  .post(`${path}`)
                  .set('Authorization', `Bearer ${token}`)
                  .send({
                    aboutUsText: 'this is a example text'
                  })
                  .end((err, res) => {
                    assert.equal(res.status, status.BAD_REQUEST);
                  });
      done();
    });

    it('Create new Organization - Valid request. Should response 200.', (done) => {
      chai
                    .request(app)
                    .post(`${path}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                      name: 'test',
                      image: 'http://www.test.com/test.jpg',
                      address: 'test 123',
                      phone: 123456,
                      email: 'test@test.com',
                      welcomeText: 'welcome example',
                    })
                    .end((err, res) => {
                      assert.equal(res.status, status.OK);
                    });
      done();
    });
  });
});

