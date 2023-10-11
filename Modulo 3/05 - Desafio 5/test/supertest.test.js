const chai = require('chai');
const supertest = require ('supertest');


const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Products', () => {    
    describe('Testing Products Api', () => {
        // Test 01
        it('Crear producto: EL API POST /api/pets debe crear una nueva mascota correctamente', async () => {
            // Given
            const productMock = {
                title: "Nuevo producto",
                description: 'Descripción del producto',
                code: 'ADHB32Q32',
                price: 456.3,
                status: true,
                category: "Televisores",
                thumbnails: [
                    "imagen 1",
                    "imagen 2"
                ]
            }
            // Then
            // const {statusCode, ok, _body} 
            const result = (await requester.post('/products/store').send(productMock))
            console.log(result)

            // Assert
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).is.ok.and.to.have.property('_id')
            // expect(_body.payload).to.have.property('adopted').and.to.be.deep.equal(false)
        })

        // Test 02
        // it()

        // Test 03
        // it()
    })
})

// describe('Testing login and session with Cookies: ', () => {
//     before(function(){
//         this.cookie;
//         this.mockUser = {
//             firts_name: "Usuario de prueba 2",
//             last_name: "Apellido de prueba 2",
//             email: "correodeprueba2@gmail.com",
//             password: "123456"
//         }
//     })

//     // Test 01
//     it("Test Registro de usuario: Debe poder registrar correctamente un usuario", async function () {
//         // Given

//         // Then
//         const { statusCode, ok, _body } = await requester.post('/api/sessions/register').send(this.mockUser)

//         expect(statusCode).is.equal(200)
//     })
// })
