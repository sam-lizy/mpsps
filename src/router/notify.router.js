const Router = require("koa-router")
const { verifyAuth } = require("../middleware/auth.middleware")
const {notifyList,addnotify,deletenotify,addChatList,getChatList, readedChatList,delAllByType} = require('../controller/notify.controler')
const notifyRouter = new Router({
    prefix:'/notify'
})
notifyRouter.post('/chatlist/:to_id',verifyAuth,addChatList)
notifyRouter.get('/chatlist',verifyAuth,getChatList)
notifyRouter.patch('/chatlist/:from_id',verifyAuth,readedChatList)
notifyRouter.get('/',verifyAuth,notifyList)
notifyRouter.post('/',verifyAuth,addnotify)
notifyRouter.delete('/type',verifyAuth,delAllByType)
notifyRouter.delete('/:id',verifyAuth,deletenotify)
module.exports = notifyRouter 