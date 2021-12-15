require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http');
const path = require('path')
const expect = chai.expect

chai.use(chaiHttp);

const imagen =  path.join(__dirname, '/imgTest/member-test.png');

const URL = `${process.env.HOST_HTTP_OR_HTTPS}://${process.env.HOST}:${process.env.PORT}`;


let token;

describe('Suite de peticiones GET a members',()=>{

    it('Deberia generar el token del usuario',(done) => {
        chai.request(URL)
            .get('/auth/login ')
           .set({email:"test@test.com",password:"1234"})
            .end((error, res) => {
               expect(res.body).to.have.property('token');
                token = res.body.token;
                expect(res).to.have.status(200);// tener estado "200"
                done();
              });
    })

    it('Deberia traer todos los miembros en un array',(done) => {
        chai.request(URL)
            .get('/members')
        
            .end((error, res) => {
                expect(res).to.have.status(200);// tener estado "200"
                expect(res.body).to.be.an('array','Se espera que sea un array'); // ser un "array"
                done();
              });
    })


    it('Deberia mostrar un error al no encontrar la ruta',(done) => {
        chai.request(URL)
            .get('/member')
            .set({Authorization:`Bearer ${token}`})
            .end((error, res) => {
                expect(res).to.have.status(404);// espera tener estado "404"
                expect(res.notFound).to.be.equal(true); // espera ser igual a true
                done();
              });
    })


    it('Deberia devolver un error al no tener token e intentar traer los miembros',(done) => {
        chai.request(URL)
            .get('/members')
            .end((error, res) => {
                expect(res).to.have.status(403);// tener estado "403"
                expect(res.forbidden).to.be.equal(true);// espera ser igual al true
                done();
              });
    })

    

    it('Deberia mostrar al miembro asignado al id',(done) => {
        chai.request(URL)
            .get('/members/2')
            .set({Authorization:`Bearer ${token}`})
            .end((error, res) => {
                expect(res).to.have.status(200);// espera tener estado "200"
                done();
              });
    })
    

    it('Deberia mostrar un error al no encontrar al miembro',(done) => {
        chai.request(URL)
            .get('/member/555555')
            .set({Authorization:`Bearer ${token}`})
            .end((error, res) => {
                expect(res).to.have.status(404);// espera tener estado "404"
                done();
              });
    })
})

describe('Suite de peticiones POST a members',()=>{


    it('Deberia crear un nuevo miembro',(done) => {
        chai.request(URL)
            .post('/members')
            .set({Authorization:`Bearer ${token}`})
            .send({
                name : "Prueba",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est voluptatem at minus provident culpa quo incidunt cum, delectus aut? Voluptates ad quidem temporibus quam nisi ullam odio impedit ratione.",
            })
            // .attach('image',imagen) //adjuntar imagen 
            .end((error, res) => {
                expect(res).to.have.status(201);// tener estado "201"
                expect(res.created).to.be.equal(true);// espera ser true
                done();
              });
    })


    it('Deberia devolver un error porque el nombre esta vacío',(done) => {
        chai.request(URL)
            .post('/members')
            .set({Authorization:`Bearer ${token}`})
            .send({
                name : "",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est voluptatem at minus provident culpa quo incidunt cum, delectus aut? Voluptates ad quidem temporibus quam nisi ullam odio impedit ratione.",
            })
            // .attach('image',imagen) //adjuntar imagen 
            .end((error, res) => {
                expect(res).to.have.status(422);// tener estado "422"
                expect(res.body).to.be.equal("UNPROCESSABLE ENTITY");// espera ser igual al msg 422 "UNPROCESSABLE ENTITY"
                done();
              });
    })




    it('Deberia devolver un error al no tener token e intentar crear un miembro',(done) => {
        chai.request(URL)
            .post('/members')
            .send({
                name : "",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est voluptatem at minus provident culpa quo incidunt cum, delectus aut? Voluptates ad quidem temporibus quam nisi ullam odio impedit ratione.",
            })
            .end((error, res) => {
                expect(res).to.have.status(403);// tener estado "403"
                expect(res.forbidden).to.be.equal(true);// espera ser igual al true
                done();
              });
    })

    
})


describe('Suite de peticiones PUT a members',()=>{
    
    it('Deberia actualizar un miembro',(done) => {
            chai.request(URL)
                .put('/members/2')
                .set({Authorization:`Bearer ${token}`})
                .send({
                    name : "update",
                    description : "texto de prueba Update",
                })
                // .attach('image',imagen) //adjuntar imagen 
                .end((error, res) => {
                    expect(res).to.have.status(200);// tener estado "200"
                    expect(res.body).to.be.equal("OK");// espera ser igual al msg 200 "ok"
                    expect(res.ok).to.be.equal(true);// espera ser igual al true
                    done();
                  });
        })

    it('Deberia devolver un error porque no envio nombre',(done) => {
        chai.request(URL)
            .put('/members/1')
            .set({Authorization:`Bearer ${token}`})
            .send({
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est voluptatem at minus provident culpa quo incidunt cum, delectus aut? Voluptates ad quidem temporibus quam nisi ullam odio impedit ratione.",
            })
            // .attach('image',imagen) //adjuntar imagen 
            .end((error, res) => {
           
                expect(res).to.have.status(400);// tener estado "422"
                expect(res.badRequest).to.be.equal(true);// espera ser igual a true
                done();
              });
    })

    it('Deberia devolver un error porque el id no existe',(done) => {
        chai.request(URL)
            .put('/members/15')
            .set({Authorization:`Bearer ${token}`})
            .send({
                name : "",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est voluptatem at minus provident culpa quo incidunt cum, delectus aut? Voluptates ad quidem temporibus quam nisi ullam odio impedit ratione.",
            })
            .end((error, res) => {
               
                expect(res).to.have.status(400);// tener estado "400"
                expect(res.badRequest).to.be.equal(true);// espera ser igual al msg 422 "UNPROCESSABLE ENTITY"
                done();
              });
    })
    

    it('Deberia devolver un error al no tener token e intentar actualizar',(done) => {
        chai.request(URL)
            .put('/members/1')
            .send({
                name : "update",
                description : "texto de prueba Update",
            })
            .end((error, res) => {
                expect(res).to.have.status(403);// tener estado "403"
                expect(res.forbidden).to.be.equal(true);// espera ser igual al true
                done();
              });
    })
})

describe('Suite de peticiones DELETE a members',()=>{

    it('Deberia eliminar un miembro',(done) => {
            chai.request(URL)
                .delete('/members/1')
                .set({Authorization:`Bearer ${token}`})
                .end((error, res) => {
                    expect(res).to.have.status(200);// tener estado "200"
                    expect(res.body).to.be.equal("OK");// espera ser igual al msg 200 "ok"
                    expect(res.ok).to.be.equal(true);// espera ser igual al true
                    done();
                  });
        })

    it('Deberia devolver un error al no tener token e intentar borrar',(done) => {
            chai.request(URL)
                .delete('/members/1')
                .end((error, res) => {
                    expect(res).to.have.status(403);// tener estado "403"
                    expect(res.forbidden).to.be.equal(true);// espera ser igual al true
                    done();
                  });
        })
})