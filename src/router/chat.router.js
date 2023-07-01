const Router = require("koa-router")
const { verifyAuth } = require("../middleware/auth.middleware")
const {getMessages,pubMessages} = require('../controller/chat.controller')
const chatRouter = new Router({
    prefix:'/personalchat'
})
chatRouter.get('/user',verifyAuth,getMessages)
chatRouter.post('/',verifyAuth,pubMessages)
module.exports = chatRouter