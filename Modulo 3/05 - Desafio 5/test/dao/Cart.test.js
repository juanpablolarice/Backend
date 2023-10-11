import CartsDao from '../../src/services/dao/mongo/models/cart.model.js'
import mongoose from 'mongoose'
import chai from 'chai'

mongoose.connect('mongodb+srv://JuanLarice:Coder2023@cluster0.z95xyv3.mongodb.net')
const expect = chai.expect

describe('Testing Carts Dao', ()=> {

    before(function() {
        this.CartsDao = new CartsDao()
    })

    beforeEach(function(){
        this.timeout(5000)
        mongoose.connection.collections.carts.drop()
    })

    // test 01
    it('El dao debe devolver los carros en formato de arreglo', async function(){
        // Given
        console.log(this.CartsDao)
        let emptyArray = []
        const isArray = true
        // Then
        const result = await this.CartsDao.get()

        console.log(result)
        // expect(result).to.be.deep.equal(emptyArray)
        // expect(Array.isArray(result)).to.be.ok
        // expect(Array.isArray(result)).to.be.equal(true)
        // expect(result.length).to.be.deep.equal(emptyArray.length)
    })
})
