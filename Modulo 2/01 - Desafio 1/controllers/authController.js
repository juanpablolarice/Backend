const User = require("../dao/models/user");

const register = async (req, res) => {
    try {
        let userNew = req.body
        const user = await User.create(userNew)
        res.redirect('/login')
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El usuario no se pudo registrar correctamente',
        })
    }
}

const loginValidate = async (req, res) => {
    try {
        let userLogin = req.body
        let userFound = await User.findOne({ email: userLogin.email, password: userLogin.password })//.exec()

        if(userFound){
            req.session.user = userLogin.email
            req.session.password = userLogin.password
            req.session.role = userFound.role
        }
        res.redirect('/productos')
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'No se pudo iniciar sesión',
        })
    }
}

const logout = async (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Failed logout')
        res.redirect('/login')
        // res.send('Logout ok!')
    })
}

module.exports = { register, loginValidate, logout }
