require('dotenv').config()
const chai = require('chai')
const httpStatus = require('http-status');

const chaiHttp = require('chai-http');
const path = require('path')
const expect = chai.expect

chai.use(chaiHttp);

const URL = `${process.env.PROTOCOL}://${process.env.ENVIRONMENT}:${process.env.PORT}`;

const { generateAccessToken } = require("../functions/jsonwebtoken");
const TOKEN = generateAccessToken({ id: 1, email: "test@test.com", roleId: 1 });


describe('News Get ',()=>{

    it('Get all news',(done) => {
        chai.request(URL)
            .get('/news')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.OK);
                expect(res.body).to.be.an('array');

                done();
              });
    })
    it('Get News',(done) => {
        chai.request(URL)
        .get('/news/1')
        .end((error, res) => {
            expect(res).to.have.status(httpStatus.OK);
            done();
          });
    })
    it('Not found',(done) => {
        chai.request(URL)
            .get('/news/dw')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.NOT_FOUND);
                done();
            });
    })

})
describe('News Create',()=>{
    it('without authorization',(done) => {
        chai.request(URL)
            .post('/news')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.FORBIDDEN);
                done();
            });
    })
    it('News created',(done) => {
        chai.request(URL)
            .post('/news')
            .set("Authorization", `Bearer ${TOKEN}`)
            .field("Content-Type", "multipart/form-data")
            .field("name", "news1")
            .field("content", "lorem news")
            .attach("image", "test/imgTest/news-test.png")
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.CREATED);
                done();
            });
            })
    it('no content',(done) => {
        chai.request(URL)
            .post('/news')
            .set("Authorization", `Bearer ${TOKEN}`)
            .field("Content-Type", "multipart/form-data")
            .field("name", "news1")
            .field("content", "lorem news")
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.NOT_ACCEPTABLE);
                done();
            });
            })        

})

describe('News Update',()=>{
    it('without authorization',(done) => {
        chai.request(URL)
        .patch('/news/1')
        .end((error, res) => {
            expect(res).to.have.status(httpStatus.FORBIDDEN);
            done();
          });
    })
    it('bad request',(done) => {
        chai.request(URL)
            .patch('/news/dsad')
            .set("Authorization", `Bearer ${TOKEN}`)
            .end((error, res) => {

                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                done();
            });
    })
    it('News updated',(done) => {
        chai.request(URL)
            .patch('/news/1')
            .set("Authorization", `Bearer ${TOKEN}`)
            .field("Content-Type", "multipart/form-data")
            .field("name", "news1")
            .field("content", "lorem news")
            .attach("image", "test/imgTest/news-test.png")
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.OK);
                done();
            });
            })
});

  describe('News Delete',()=>{
    it("News deleted", (done) => {
        chai
          .request(URL)
          .delete(`news/1`)
          .set("Authorization", `Bearer ${TOKEN}`)
          .end((err, res) => {
            assert.isNull(err);
            assert.equal(res.status, code.OK);
            assert.equal(res.body.message, DELETED_TESTIMONIAL(1));
  
            done();
          });
      });
    it('without authorization',(done) => {
        chai.request(URL)
        .delete('/news/1')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.FORBIDDEN);
                done();
              });
    })
    it('not found',(done) => {
        chai.request(URL)
            .delete('/news/dsad')
            .set("Authorization", `Bearer ${TOKEN}`)
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.NOT_FOUND);
                done();
              });
    })
})