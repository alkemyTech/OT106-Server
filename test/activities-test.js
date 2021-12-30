require('dotenv').config()
const chai = require('chai')
const httpStatus = require('http-status');

const chaiHttp = require('chai-http');
const path = require('path')
const expect = chai.expect

chai.use(chaiHttp);
const imagen =  path.join(__dirname, '/imgTest/member-test.png');

const URL = `${process.env.PROTOCOL}://${process.env.ENVIRONMENT}:${process.env.PORT}`;
const { generateAccessToken } = require("../functions/jsonwebtoken");
const TOKEN = generateAccessToken({ id: 1, email: "test@test.com", roleId: 1 });


describe('Activities Get ',()=>{

    it('Deberia traer todas las actividades en un como objeto',(done) => {
        chai.request(URL)
            .get('/activities')

            .end((error, res) => {
                expect(res).to.have.status(httpStatus.OK);// tener estado "200"
                expect(res.body).to.be.an('array'); // ser un "array"

                done();
              });
    })
    
    it('Deberia traer una actividad',(done) => {
        chai.request(URL)
            .get('/activities/1')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.OK);// tener estado "200"
                done();
              });
    })
    
    it('Deberia responder con un msg de error, actividad no encontrada',(done) => {
        chai.request(URL)
            .get('/activities/dw')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.NOT_FOUND);
                done();
              });
    })

    
   


    
})
describe('Activities Create',()=>{
    it('Deberia responder no permitido',(done) => {
        chai.request(URL)
            .post('/activities')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.FORBIDDEN);
                done();
              });
    })
    it('Deberia responder actividad creada',(done) => {
        chai.request(URL)
            .post('/activities')
            .set("Authorization", `Bearer ${TOKEN}`)
            .field("Content-Type", "multipart/form-data")
            .field("name", "activity1")
            .field("content", "esto es una actividad")
            .attach("image", "test/imgTest/member-test.png")
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.CREATED);
                done();
              });
            })
    it('Deberia responder no content',(done) => {
        chai.request(URL)
            .post('/activities')
            .set("Authorization", `Bearer ${TOKEN}`)
            .field("Content-Type", "multipart/form-data")
            .field("name", "activity1")
            .field("content", "esto es una actividad")
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.NOT_ACCEPTABLE);
                done();
              });
            })        
            
    })



describe('Activities Update',()=>{
    it('Deberia responder no permitido',(done) => {
        chai.request(URL)
            .patch('/activities/1')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.FORBIDDEN);
                done();
              });
    })
    it('Deberia responder bad_request',(done) => {
        chai.request(URL)
            .patch('/activities/dsad')
            .set("Authorization", `Bearer ${TOKEN}`)
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                done();
              });
    })
    it('Deberia responder actividad updateada',(done) => {
        chai.request(URL)
            .patch('/activities/1')
            .set("Authorization", `Bearer ${TOKEN}`)
            .field("Content-Type", "multipart/form-data")
            .field("name", "activity1")
            .field("content", "esto es una actividad")
            .attach("image", "test/imgTest/member-test.png")
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.OK);
                done();
              });
            })
      });



describe('Activities Delete',()=>{
    it('Deberia responder no permitido',(done) => {
        chai.request(URL)
            .delete('/activities/1')
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.FORBIDDEN);
                done();
              });
    })

    it('Deberia responder no encontrado',(done) => {
        chai.request(URL)
            .delete('/activities/dsad')
            .set("Authorization", `Bearer ${TOKEN}`)
            .end((error, res) => {
                expect(res).to.have.status(httpStatus.NOT_FOUND);
                done();
              });
    })
})

    
