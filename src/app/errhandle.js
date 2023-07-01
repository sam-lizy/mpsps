const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXIST,
    USER_DOES_NOT_EXIST,
    PASSWORD_IS_INCORRENT,
    UNAUTHORIZATION,
    UNPERMISSION

} = require("../constants/err-types")

const errhandler = (error, ctx) => {
    let status, message
    switch (error.message) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = "用户名或密码为空"
            break
        case USER_ALREADY_EXIST:
            status = 409 //冲突
            message = "用户已存在"
            break
        case USER_DOES_NOT_EXIST:
            status = 400 //参数错误
            message = '用户不存在'
            break
        case PASSWORD_IS_INCORRENT:
            status = 400
            message = '密码不正确'
            break
        case UNAUTHORIZATION:
            status = 401
            message = 'token无效'
            break
        case UNPERMISSION:
            status = 401
            message = '无权限!'
            break
        default:
            status = 404
            message = 'Not Found'

    }
    ctx.status = status
    ctx.body = message

}
module.exports = errhandler