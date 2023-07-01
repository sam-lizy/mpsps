const Router = require("koa-router")
const { verifyAuth } = require("../middleware/auth.middleware")
const {getCommendList,addCommend}  = require('../controller/commend.controler')
const commendRouter = new Router({
    prefix:'/commend'
})
commendRouter.get('/:momentId',getCommendList)
commendRouter.post('/',verifyAuth,addCommend)
module.exports = commendRouter