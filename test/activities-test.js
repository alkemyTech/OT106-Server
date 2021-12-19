require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http');
const path = require('path')
const expect = chai.expect

chai.use(chaiHttp);

const URL = `${process.env.PROTOCOL}://${process.env.ENVIRONMENT}:${process.env.PORT}`;



describe('Activities Get ',()=>{

    it('Deberia traer todas las actividades en un como objeto',(done) => {
        chai.request(URL)
            .get('/activities')
        
            .end((error, res) => {
                expect(res).to.have.status(200);// tener estado "200"
                expect(res.body).to.be.an('array'); // ser un "array"

                done();
              });
    })
    
    it('Deberia traer una actividad en un como objeto',(done) => {
        chai.request(URL)
            .get('/activities/4')
            .end((error, res) => {
                expect(res).to.have.status(200);// tener estado "200"

                done();
              });
    })
    
    it('Deberia responder con un msg de error, actividad no encontrada',(done) => {
        chai.request(URL)
            .get('/activities/dw')
            .end((error, res) => {
                expect(res).to.have.status(404);
                done();
              });
    })
    
   


    
})
describe('Activities Create',()=>{
    it('Deberia responder no permitido',(done) => {
        chai.request(URL)
            .post('/activities')
            .end((error, res) => {
                expect(res).to.have.status(403);
                done();
              });
    })

})

describe('Activities Update',()=>{
    it('Deberia responder no permitido',(done) => {
        chai.request(URL)
            .patch('/activities/5')
            .end((error, res) => {
                expect(res).to.have.status(403);
                done();
              });
    })
    it('Deberia responder no encontrado',(done) => {
        chai.request(URL)
            .patch('/activities/dsad')
            .end((error, res) => {
                expect(res).to.have.status(404);// tener estado "200"
                done();
              });
    })


})

describe('Activities Delete',()=>{
    it('Deberia responder no permitido',(done) => {
        chai.request(URL)
            .delete('/activities/12')
            .end((error, res) => {
                expect(res).to.have.status(403);// tener estado "200"
                done();
              });
    })

    it('Deberia responder no encontrado',(done) => {
        chai.request(URL)
            .delete('/activities/dsad')
            .end((error, res) => {
                expect(res).to.have.status(404);// tener estado "200"
                done();
              });
    })
})

    
