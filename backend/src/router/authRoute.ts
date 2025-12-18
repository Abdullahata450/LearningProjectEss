import { login, register } from '../controller/authController.js';
import { Router } from 'express';

const loginRouter = Router();

loginRouter.post('/register', register);

/* #swagger.tags = ['Authentication']
       #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        username: "azfar_test",
                        password: "Password123"
                    }
                }
            }
        }
    */
loginRouter.post('/login', login);

export default loginRouter;