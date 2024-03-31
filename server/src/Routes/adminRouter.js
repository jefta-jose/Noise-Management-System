import { Router } from "express";
import { registerAdmin }

const adminRouter = Router();

adminRouter.post('/register/admin', registerAdmin);
adminRouter.get();
adminRouter.put();
adminRouter.delete();

export default adminRouter;