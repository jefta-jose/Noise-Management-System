import { Router } from "express"
import {registerUser, LoginAsUser, userDetails, allUsers, updateUserDetails, deleteUser} from "../Controllers/userController.js";

const userRouter = Router();
userRouter.post('/register/user', registerUser);
userRouter.post('/login/user', LoginAsUser);
userRouter.get('/user/:id', userDetails);
userRouter.get('/users', allUsers);
userRouter.put('/user/update/:id', updateUserDetails);
userRouter.delete('/user/delete/:id', deleteUser);
export default userRouter;