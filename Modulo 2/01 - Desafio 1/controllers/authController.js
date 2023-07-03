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
        const { email, password } = req.body
        let userLogin = req.body
        let userFound = await User.findOne({ email: userLogin.email, password: userLogin.password })//.exec()
        if(userFound){
            req.session.name = userFound.name
            req.session.user = userFound.email
            req.session.role = userFound.role
            // req.session.save()
            res.redirect('/products')
        }else{
            res.render('login', {
                error: 'Las credenciales no coinciden'
                // email: email,
                // password: password
            })
        //     res.send('user not Found')
        }
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
    // console.log(req.session)

    // req.session.destroy()
    // if(req.session == undefined)
    //     res.redirect('/login')
    // res.send('Failed logout')

    // console.log('Despues del destroy')
    // console.log(req.session)

}

module.exports = { register, loginValidate, logout }
