const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const status = require('../constants/httpStatus');
// const message = require('../constants/organization-constant');
const { generateAccesToken } = require('../functions/jsonwebtoken');

const assert = chai.assert;
const path = '/organizations/public';

const token = generateAccesToken({ id: 67, email: 'fa@afa.com', roleId: 1 });

chai.use(chaiHttp);

// //// ISSUE -> The response formats are not unified
// //// at the moment, only verify the response code

describe('Organization suit test', () => {
  describe('Suit test for GET', () => {
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

  describe('Suit test for POST', () => {
    it('Invalid request, missing token. Should response 403.', (done) => {
      chai
          .request(app)
          .post(`${path}/contact/1`)
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
            .post(`${path}/contact`)
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
              .post(`${path}/contact/999`)
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
              .post(`${path}/contact/4`)
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
                .post(`${path}/contact/4`)
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
