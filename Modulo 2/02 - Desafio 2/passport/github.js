const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

// const githubPassport = () => {
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
    ))
// }

// module.exports = githubPassport
