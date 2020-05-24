let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let pool = require('./db');

// LocalStrategy
passport.use(
    new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
        },
        async function(req, username, password, done) {
            let [user] = await UserModel.find({username: username});

            if (user.length === 0) {
                return done(false, null);
            }

            console.log(user.username)
            if (username === user.username && password === user.password) {
                return done(null, {
                    'username': username
                })
            } else {
                console.log("ID or Password Mismatch.")
                console.log(user.username, user.password)
            }
            




            // if (username === 'user001' && student_id === 'password') {
            //     return done(null, {
            //         'user_id': username,
            //     });
            // } else {
            //     return done(false, null)
            // }
            // let Username = await AuthHelper.FindUsername(username);
            // if (Username === null) {
            //     // 사용자가 없는 경우
            //     return done(false, null);
            // }

            // if (Username)


            // if (username === "user001" && password === "password") {
            //     return done(null, {
            //         username: username
            //     });
            // } else {
            //     return done(false, null);
            // }
        }
    )
);


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;