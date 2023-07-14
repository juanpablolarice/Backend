const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-local').Strategy
const userModel = require('../dao/models/user')
const {createHash, isValidPassword} = require('../utils/bcrypts')

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'},
        async (req, username, password, done) => {
            try {
                let userData = req.body
                // BUSCAR SI EXISTE EL USUARIO
                let user = await userModel.findOne({email: username})
                if(user) {
                    console.log('Ya existe')
                    done(null, false)
                }

                let userNew = {
                    name: userData.name,
                    email: userData.email,
                    password: await createHash(userData.password),
                    phone: userData.phone,
                    role: 'User'
                }

                let result = await userModel.create(userNew)
                done(null, result)
            } catch (e) {
                return done("Error al crear el usuario: " + e)
            }
        },
        passport.serializeUser((user, done) => {
            done(null, user._id)
        }),
        passport.deserializeUser(async (id, done) => {
            let user = await userModel.findById(id)
            done(null, user)
        }),
        passport.use('auth-github', new GitHubStrategy(
            {
                clientID: '3adaf1d5753e5c9d0551',
                clientSecret: '98c5184d74125a685d9a837bd9fa28a7c6e0b9a0',
                callbackURL: "http://localhost:8080/auth/github/callback"
            },
            function(accessToken, refreshToken, profile, done) {
                // User.findOrCreate({ githubId: profile.id }, function (err, user) {
                //     return done(err, user);
                // });
                console.log(profile)
                done(null, profile)
            }
        )),
    ))
}

module.exports = initializePassport
