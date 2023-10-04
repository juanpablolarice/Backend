const express = require('express')
const { Router } = express
const router = new Router()

router.get('/current', async (req, res) => {
    try{
        // En el req.session.user se asigno el DTO de user
        res.status(200).send(req.session.user)
    }catch (error) {
        res.status(500).json({
            status: 'Error',
            msg: 'No se pudo obtener la sesión del usuario',
        })
    }
})

module.exports = router
