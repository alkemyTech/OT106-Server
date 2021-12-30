const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const status = require('../constants/httpStatus');
// const message = require('../constants/organization-constant');
const { generateAccessToken } = require('../functions/jsonwebtoken');

const assert = chai.assert;
const path = '/organizations/public';

const token = generateAccessToken({ id: 67, email: 'fa@afa.com', roleId: 1 });

chai.use(chaiHttp);

// //// ISSUE -> The response formats are not unified
// //// at the moment, only verify the response code

describe('Organization suit test', () => {
  describe('Suite test for GET', () => {
    it('Valid request. Should response 200.', (done) => {
      chai
        .request(app)
        .get(path)
        .end((err, res) => {
          assert.equal(res.status, status.OK);
        });
      done();
    });
  });

  describe('Suite test for PUT | update data for organizations', () => {
    it('Invalid request, missing token. Should response 403.', (done) => {
      chai
          .request(app)
          .put(`${path}/4`)
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

    it('Invalid request, missing id organization to update. Should response 404.', (done) => {
      chai
            .request(app)
            .put(`${path}/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              name: 'test',
              image: 'http://www.test.com/test.jpg',
              address: 'test 123',
              phone: 123456,
              email: 'test@test.com',
              welcomeText: 'welcome example',
              aboutUsText: 'about example',
              facebook: 'http://www.facebook.com/test',
              instagram: 'http://www.instagram.com/test',
              linkedin: 'http://www.linkedin.com/test'
            })
            .end((err, res) => {
              assert.equal(res.status, status.NOT_FOUND);
            });
      done();
    });

    it('Invalid request, id organization not exists. Should response 404.', (done) => {
      chai
              .request(app)
              .put(`${path}/999`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                name: 'test',
                image: 'http://www.test.com/test.jpg',
                address: 'test 123',
                phone: 123456,
                email: 'test@test.com',
                welcomeText: 'welcome example',
                aboutUsText: 'about example',
                facebook: 'http://www.facebook.com/test',
                instagram: 'http://www.instagram.com/test',
                linkedin: 'http://www.linkedin.com/test'
              })
              .end((err, res) => {
                assert.equal(res.status, status.NOT_FOUND);
              });
      done();
    });

    it('Invalid request, missing required fields. Should response 400.', (done) => {
      chai
              .request(app)
              .put(`${path}/4`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                aboutUsText: 'this is a example text'
              })
              .end((err, res) => {
                assert.equal(res.status, status.BAD_REQUEST);
              });
      done();
    });

    it('Valid request. Should response 200.', (done) => {
      chai
                .request(app)
                .put(`${path}/4`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                  name: 'test',
                  image: 'http://www.test.com/test.jpg',
                  address: 'test 123',
                  phone: 123456,
                  email: 'test@test.com',
                  welcomeText: 'welcome example',
                  aboutUsText: 'about example',
                  facebook: 'http://www.facebook.com/test',
                  instagram: 'http://www.instagram.com/test',
                  linkedin: 'http://www.linkedin.com/test'
                })
                .end((err, res) => {
                  assert.equal(res.status, status.OK);
                });
      done();
    });
  });

  describe('Suite test for put | update contact info for organizations', () => {
    it('Invalid request, missing token. Should response 403.', (done) => {
      chai
          .request(app)
          .put(`${path}/contact/1`)
          .send({
            email: '',
            facebook: '',
            instagram: '',
            linkedin: ''
          })
          .end((err, res) => {
            assert.equal(res.status, status.FORBIDDEN);
          });
      done();
    });

    it('Invalid request, missing id organization to update. Should response 400.', (done) => {
      chai
            .request(app)
            .put(`${path}/contact`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              email: '',
              facebook: '',
              instagram: '',
              linkedin: ''
            })
            .end((err, res) => {
              assert.equal(res.status, status.BAD_REQUEST);
            });
      done();
    });

    it('Invalid request, id organization not exists. Should response 404.', (done) => {
      chai
              .request(app)
              .put(`${path}/contact/999`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                email: 'prueba@prueba.com',
                facebook: 'http://www.facebook.com/alguna-prueba',
                instagram: 'http://www.facebook.com/alguna-prueba',
                linkedin: 'http://www.facebook.com/alguna-prueba'
              })
              .end((err, res) => {
                assert.equal(res.status, status.NOT_FOUND);
              });
      done();
    });

    it('Invalid request, url format incorrect. Should response 400.', (done) => {
      chai
              .request(app)
              .put(`${path}/contact/4`)
              .set('Authorization', `Bearer ${token}`)
              .send({
                email: 'prueba@prueba.com',
                facebook: 'lguna-prueba',
                instagram: 'http://www',
                linkedin: 'http:prueba'
              })
              .end((err, res) => {
                assert.equal(res.status, status.BAD_REQUEST);
              });
      done();
    });

    it('Valid request. Should response 200.', (done) => {
      chai
                .request(app)
                .put(`${path}/contact/4`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                  email: 'prueba@prueba.com',
                  facebook: 'http://www.facebook.com/alguna-prueba',
                  instagram: 'http://www.facebook.com/alguna-prueba',
                  linkedin: 'http://www.facebook.com/alguna-prueba'
                })
                .end((err, res) => {
                  assert.equal(res.status, status.OK);
                });
      done();
    });
  });
});
