const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User =require('../models/User');

//Configure local strategy 
passport.use(
    new LocalStrategy(
        {usernameField :'username',passwordField:'password'},
        async(username,password,done)=>{
            try{
                //Check  user exists
                const user = await User.findOne({username});
                if(!user){
                    return done(null,false,{message:'Incorrect username'})
                }

                //Check password 
                const isMatch = await bcrypt.compare(password,user.password);
                if(!isMatch){
                    return done(null,false,{message:'incorrect password'});
                }
                return done(null,user);
            }
            catch(err){
                    return done(err);
            }
        }
    )
);

//Serialize and deserialize 
passport.serializeUser((user, done)=>done(null, user.id));
passport.deserializeUser((id, done)=> {User.findById(id)
        .then(user =>done(null,user))
        .catch(err=>done(err,null));
});