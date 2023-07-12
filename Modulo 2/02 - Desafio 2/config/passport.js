const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const initializePassport = () => {
    passport.use('', LocalStrategy(
        {passReqToCallback:true, usernameField:'email'},
        async (req, username, password, productController) => {
            try {
                let userData = req.body
                // BUSCAR SI EXISTE EL USUARIO
                const user = {
                    name:
                }
            } catch (e) {

            }
        }
    ))
}
