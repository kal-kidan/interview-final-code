const Koa = require('koa');
const mongoose = require('./db_connection.js');
const userController = require('./controllers/user.controller.js')
const authMiddleware = reuire('./middlewares/auth.middlware')

const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// authMiddleware created while I was in the call and added here after the call is closed since I fogot to add it in the call :)
router.get('/cron',authMiddleware, userController)


app.use(async (ctx, next) => {
    await next(); 
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});