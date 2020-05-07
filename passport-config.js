const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUser, getUserById) {

  const authenticateUser = async (username, password, done) => {
    const user = await getUser(username)
    if(user == null) {
      console.log(user)
      return done(null, false, { message:'no user' })
    }
    try{
      if(await bcrypt.compare(password , user.password)){
        return done(null, user)
      }else {
        return done(null, false, {message:'password incorrect'})
      }
    } catch(err){
      console.log(err)
      return done(err);
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user,done) => done(null,user.id))
  passport.deserializeUser((id,done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
