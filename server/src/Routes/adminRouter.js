import { Router } from "express";
import { deleteAdmin, allAdmins, adminDetails, registerAdmin, LoginAsAdmin, updateAdminDetails } from "../Controllers/adminController.js";

const adminRouter = Router();
adminRouter.post('/register/admin', registerAdmin);
adminRouter.post('/login/admin', LoginAsAdmin);
adminRouter.get('/admin/:id', adminDetails);
adminRouter.get('/admins', allAdmins);
adminRouter.put('/admin/update/:id', updateAdminDetails);
adminRouter.delete('/admin/delete/:id', deleteAdmin);
export default adminRouter;