const express = require('express')
const { Router } = express
const router = new Router()
const userModel = require('../dao/models/user')

router.get('/current', async (req, res) => {
    try{
        // let user = await userModel.findOne({email: req.session.email}, '_id name email phone age cart role')
        res.status(200).send(req.session.user)
    }catch (error) {
        res.status(500).json({
            status: 'Error',
            msg: 'No se pudo obtener la sesión del usuario',
        })
    }
})

router.get('/:cid', )


module.exports = router
