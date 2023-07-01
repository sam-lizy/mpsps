const Router = require("koa-router");
const authRouter = new Router();

const {verifyAuth,verifyLogin} = require("../middleware/auth.middleware");
const { login, success } = require("../controller/auth.controler.js");
authRouter.post("/login", verifyLogin, login);
module.exports = authRouter;
 