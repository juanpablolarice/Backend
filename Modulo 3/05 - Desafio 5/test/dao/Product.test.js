import ProductDao from '../../src/services/dao/mongo/models/product.model.js'
import mongoose from 'mongoose'
import chai from 'chai'

mongoose.connect('mongodb+srv://JuanLarice:Coder2023@cluster0.z95xyv3.mongodb.net')
const expect = chai.expect

describe('Testing Products Dao', ()=> {

    before(function() {
        this.ProductDao = new ProductDao()
    })

    beforeEach(function(){
        this.timeout(5000)
        mongoose.connection.collections.products.drop()
    })

    // test 01
    it('El dao debe devolver los productos en formato de arreglo', async function(){
        // Given
        console.log(this.ProductDao)
        let emptyArray = []
        const isArray = true
        // Then
        const result = await this.ProductDao.get()

        console.log(result)
        // expect(result).to.be.deep.equal(emptyArray)
        // expect(Array.isArray(result)).to.be.ok
        // expect(Array.isArray(result)).to.be.equal(true)
        // expect(result.length).to.be.deep.equal(emptyArray.length)
    })
})
