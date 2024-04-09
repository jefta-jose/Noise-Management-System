import { Router } from 'express';
import { createEmailToAdmin , createEmail, allEmails, specificEmail, onespecificEmail, updateEmail, deleteEmail } from "../Controllers/emailController.js";

const emailRouter = Router();
emailRouter.post('/createEmail/:id', createEmail);
emailRouter.get('/Emails', allEmails);
emailRouter.get('/Email/:id', specificEmail); // for a user
emailRouter.get('/oneEmail/:id', onespecificEmail); // by Email id
emailRouter.put('/updateEmail/:id', updateEmail);
emailRouter.delete('/deleteEmail/:id', deleteEmail);
emailRouter.post('/createEmailToAdmin/:id', createEmailToAdmin);


export default emailRouter;