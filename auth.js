import passport from 'passport';
import LocalStrategy from 'passport-local';
import Person from './models/Person.js';

passport.use(new LocalStrategy(async (USERNAME, password, done)=>{
    try {
        // console.log('Received Credentials:', USERNAME, password);
        const user = await Person.findOne({username: USERNAME});
        if(!user)
            return done(null, false, {message: 'Incorrect Username.'});
        
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password.'})
        }
    } catch (error) {
        return done(err);
    }
}));

export default passport;