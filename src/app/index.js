const Koa = require('koa')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router')
const errhandler = require('./errhandle');
const momentRouter = require('../router/moment.router');
const commentRouter = require('../router/comment.router');
const fileRouter = require('../router/file.router');
const notifyRouter = require('../router/notify.router')
const commendRouter = require('../router/commend.router')
const chatRouter = require('../router/chat.router')
const app = new Koa();
app.use(cors())
const routesarr = [userRouter,authRouter,momentRouter,commentRouter,fileRouter,notifyRouter,commendRouter,chatRouter]
app.use(bodyparser())
routesarr.forEach((router)=>{
    app.use(router.routes())
    app.use(router.allowedMethods())//请求方式审查
})


app.on('error',errhandler)


module.exports = app