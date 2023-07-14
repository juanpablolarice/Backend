const User = require("../dao/models/user");
const { createHash, isValidPassword } = require('../utils/bcrypts')

const register = async (req, res) => {
    try {
        const userNew = req.body
        userNew.password = await createHash(userNew.password)
        console.log(req.body
        )
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

        if(userLogin.email === 'adminCoder@coder.com' && userLogin.password === 'adminCod3r123'){
            req.session.user = 'adminCoder@coder.com'
            req.session.role = 'admin'

            res.status(200).redirect('/products')
        }

        let userFound = await User.findOne({ email: userLogin.email })
        console.log(userFound)
        if(userFound){
            if(isValidPassword(userFound, userLogin.password)){
                req.session.user = userFound.email
                req.session.role = userFound.role

                res.status(200).redirect('/products')
            }
        }else{
            res.render('login', {
                status: 'Error',
                error: 'No se pudo iniciar sesión'
            })
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
