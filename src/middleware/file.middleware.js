const multer = require('koa-multer')
const avatarUpload = multer({
    dest:'./uploads/avatar'
})
const avatarHandle = avatarUpload.single('avatar')
const pictureUpload = multer({
    dest:'./uploads/picture'
})
const pictureHandle = pictureUpload.array('picture',9)
module.exports = {
    avatarHandle,
    pictureHandle
}