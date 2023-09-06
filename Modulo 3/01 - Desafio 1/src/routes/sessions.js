const express = require('express')
const { Router } = express
const router = new Router()

router.get('/current', async (req, res) => {
    try{
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
