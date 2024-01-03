module.exports = (ctx, next)=>{
const login = ctx.request.query.login;
const password = ctx.request.query.password;

const [authSuccess, user] = authVerification(login, password);

if (authSuccess === false && user.role != 'admin') {
  throw Error('Incorrect credentials');
}
next();
}
const authVerification = async (ctx, login, password) {
    const user = await User.find({ login });
  
    if (user.password = password) {
      return [true, user];
    }
  }