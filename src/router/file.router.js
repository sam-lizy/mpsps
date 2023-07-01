const router = require('koa-router')
const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controler')
const { verifyAuth } = require('../middleware/auth.middleware')
const  { avatarHandle ,pictureHandle } = require('../middleware/file.middleware')
const fileRouter = new router({prefix:'/upload'})

fileRouter.post('/avatar',verifyAuth,avatarHandle,saveAvatarInfo)
fileRouter.post('/picture',verifyAuth,pictureHandle,savePictureInfo)

module.exports = fileRouter