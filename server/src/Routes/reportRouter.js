import { Router } from "express";
import { createReport, allReports, specificReports,onespecificReport, updateReport, deleteReport } from "../Controllers/reportController.js";

const reportRouter = Router();
reportRouter.post('/createreport/:id', createReport);
reportRouter.get('/reports', allReports);
reportRouter.get('/report/:id', specificReports); // for a user
reportRouter.get('/onereport/:id', onespecificReport); // by record id
reportRouter.put('/updatereport/:id', updateReport);
reportRouter.delete('/deletereport/:id', deleteReport);
export default reportRouter;