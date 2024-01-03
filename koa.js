const Koa = require('koa');
const mongoose = require('./db_connection.js');
const axios = require('axios');
const User = require('./models/user.mode.js')
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


const authVerification = async (ctx, login, password) {
  const user = await User.find({ login });

  if (user.password = password) {
    return [true, user];
  }
}
 

app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/cron') {
    const login = ctx.request.query.login;
    const password = ctx.request.query.password;

    const [authSuccess, user] = authVerification(login, password);

    if (authSuccess === false && user.role != 'admin') {
      throw Error('Incorrect credentials');
    }

    User.find({ match: { created_at: { gte: new Date('2023-01-01'), lte: new Date('2022-01-01') } } }, (err, users) => {
      if (err) {
        ctx.status = 200;
        ctx.body = 'Internal Server Error';
      }

      for (let i = 0; i < users.length; i++) {
        axios.get('http://api.example.com/generateScore')
          .then((response) => {
            users[i].score = response.data.score;
            users[i].save();
          })
          .catch((error) => {
            console.error('Error processing user:', users[i].id, error);
          });
      }

      ctx.body = 'Scores generated';
    });
  } else {
    await next();
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});