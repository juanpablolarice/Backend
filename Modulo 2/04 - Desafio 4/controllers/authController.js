const User = require("../dao/models/user");
const passport = require('passport')
const { createHash, isValidPassword } = require('../utils/bcrypts')

const authMiddleware = async (req, res, next) => {
    if(req.session.user){
        if(req.session.user.role == 'User' || req.session.user.role == 'Admin'){
            next()
        }else{
            return res.redirect('login')
        }
    }else{
        return res.redirect('login')
    }
}

const showRegisterForm = (req, res) => {
    res.render('register')
}

const register = async (req, res) => {
    // try {
    //     const userNew = req.body
    //     userNew.password = await createHash(userNew.password)
    //     console.log(req.body
    //     )
    //     const user = await User.create(userNew)
    //     res.redirect('/login')
    // } catch (e) {
    //     return res.status(500).json({
    //         status: 'Error',
    //         msg: 'El usuario no se pudo registrar correctamente',
    //     })
    // }
}


const logout = async (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Failed logout')
        res.redirect('/login')
    })
}

module.exports = { authMiddleware, showRegisterForm, register, logout }
