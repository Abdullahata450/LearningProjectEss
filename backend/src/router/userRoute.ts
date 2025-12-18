import express, { Request, Response } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import User from '../model/user.js'; // Assuming your Mongoose Model is here
import {getUserData,getAllUsers,deleteUser} from '../controller/userController.js'

interface UserPayload {
    id: string; 
    role: string; 
}
interface AuthRequest extends Request {
    user?: UserPayload; 
}

const router = express.Router();



router.get('/:username', protect, getUserData);


router.get('/users', protect, authorize(['admin']), getAllUsers);

/* #swagger.tags = ['Users']
      #swagger.summary = 'Delete a user by username'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.parameters['username'] = {
          in: 'path',
          description: 'Username of the user to delete',
          required: true,
          type: 'string'
      }
   */
router.delete('/:username', protect, authorize(['admin']), deleteUser);
/* #swagger.tags = ['Users']
        #swagger.summary = 'Delete a user'
        #swagger.description = 'Only an admin can delete users. Admins cannot delete themselves.'
        #swagger.security = [{ "bearerAuth": [] }]
    */
/* #swagger.parameters['id'] = {
        description: 'The unique MongoDB User ID',
        type: 'string'
    }
*/
/* #swagger.responses[200] = {
        description: 'User successfully removed',
        schema: { message: 'User successfully removed' }
    }
*/
export default router;