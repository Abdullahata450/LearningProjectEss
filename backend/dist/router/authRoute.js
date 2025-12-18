import { login, register } from '../controller/authController.js';
import { Router } from "express";
const loginRouter = Router();
loginRouter.post('/login', login); // route to login
loginRouter.post('/register', register); // endpoint to register a user
export default loginRouter;
//# sourceMappingURL=authRoute.js.map