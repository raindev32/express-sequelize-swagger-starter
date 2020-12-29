import authRouter from './v1/auth/authRouter'
import userRouter from './v1/user/userRouter'
import roleRouter from './v1/role/roleRouter'


function routes(app) {
   app.use(authRouter)
   app.use(userRouter)
   app.use(roleRouter)
}

export default routes