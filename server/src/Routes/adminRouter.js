import { Router } from "express";
import { numberOfReportsPerDay, numberOfReports, numberOfUsers, deleteAdmin, allAdmins, adminDetails, registerAdmin, LoginAsAdmin, updateAdminDetails } from "../Controllers/adminController.js";

const adminRouter = Router();
adminRouter.post('/register/admin', registerAdmin);
adminRouter.post('/login/admin', LoginAsAdmin);
adminRouter.get('/admin/:id', adminDetails);
adminRouter.get('/admins', allAdmins);
adminRouter.put('/admin/update/:id', updateAdminDetails);
adminRouter.delete('/admin/delete/:id', deleteAdmin);
adminRouter.get('/numberOfUsers', numberOfUsers);
adminRouter.get('/numberOfReports', numberOfReports);
adminRouter.get('/numberOfReportsPerDay', numberOfReportsPerDay)


export default adminRouter;

