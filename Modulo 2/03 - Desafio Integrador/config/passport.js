const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const userModel = require('../dao/models/user')
const cartModel = require('../dao/models/cart')
const {createEmptyCart} =require('../controllers/cartController')
const {createHash, isValidPassword} = require('../utils/bcrypts')

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'},
        async (req, username, password, done) => {
            try {
                let userData = req.body
                // BUSCAR SI EXISTE EL USUARIO                
                let user = await userModel.findOne({email: username}, '_id name email phone age cart role')
                if(user) {
                    console.log('Ya existe')
                    done(null, false)
                }


                const cart = await cartModel.create({})
                console.log(cart)
                let userNew = {
                    name: userData.name,
                    age: userData.age,
                    phone: userData.phone,
                    cart: cart._id,
                    email: userData.email,
                    password: await createHash(userData.password),
                    role: 'User'
                }

                let result = await userModel.create(userNew)
                const userCreated = await userModel.findOne({email: userData.email}, '_id name email phone age cart role')
                done(null, userCreated)
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
    )),
    passport.use('login', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        },
        async (req, username, password, done) =>{
            try {
                const userData = await userModel.findOne({ email: username });
                if(userData){
                    const validPassword = await isValidPassword( userData, password );
                    if(validPassword){                        
                        const user = await userModel.findOne({email: username}, '_id name email phone age cart role')
                        return done(null, user);
                    }else{                        
                        return done(null, false, {message: 'El usuario y la clave no coinciden...'});
                    }
                }else{
                    return done(null, false, { message: 'El usuario no existe...'});
                }
            } catch (e) {
                return done(e);
            }
        }
    )),
    passport.use('auth-github', new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/github/callback"
        },
        async function (accessToken, refreshToken, profile, done){
            try {
                let user = await userModel.findOne({ email: `${profile._json.login}@github.com.ar`}, '_id name email phone age cart role')
                
                if(user == null){
                    const cart = await cartModel.create({})

                    let newUser = {
                        name: profile._json.name,
                        age: 30,
                        cart: cart._id,
                        phone: '1122334455',
                        email: `${profile._json.login}@github.com.ar`,
                        password: await createHash('password'),
                        role: 'User'
                    }

                    let result = await userModel.create(newUser)
                    console.log("no encontro", result)
                    done(null, result)
                }else{
                    console.log("encontro user", user)
                    done(null, user)
                }
            }catch(error){
                console.log(error)
                done(error)
            }
        }
    ))
}

module.exports = initializePassport
