const Router = require("koa-router")
const {create,reply, update,remove,list} = require('../controller/comment.controler')
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")
const commentRouter = new Router({
    prefix:'/comment'
})

commentRouter.post('/post',verifyAuth,create)
commentRouter.get('/get/:momentId',list)
commentRouter.post('/:commentId/reply',verifyAuth,reply)
// commentRouter.patch('/:commentId/update',verifyAuth,verifyPermission,update)
// commentRouter.delete('/:commentId/delete',verifyAuth,verifyPermission,remove)


module.exports = commentRouter  