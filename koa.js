const Koa = require('koa');
const mongoose = require('./db_connection.js');
const userController = require('./controllers/user.controller.js')
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/cron', userController)


app.use(async (ctx, next) => {
    await next(); 
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});