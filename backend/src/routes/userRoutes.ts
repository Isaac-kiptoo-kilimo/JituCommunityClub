import { Router , Request, Response} from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { deleteUserController, getSingleUserController, registerUserController, updateUserController } from '../controllers/userControllers';


const userRouter=Router();

userRouter.post('/',()=>{
    console.log('running in the app');
    
});
userRouter.post('/register', registerUserController);
userRouter.put('/updateUser/:userID', updateUserController);
userRouter.get('/singleUser/:userID',verifyToken,getSingleUserController)
userRouter.delete('/delete/:userID',deleteUserController)



export default userRouter;