import { Router } from "express";
import { createFeedback, allFeedbacks, specificFeedback, onespecificFeedback, updateFeedback, deleteFeedback } from "../Controllers/feedbackController.js";

const feedbackRouter = Router();
feedbackRouter.post('/createfeedback/:id', createFeedback);
feedbackRouter.get('/feedbacks', allFeedbacks);
feedbackRouter.get('/feedback/:id', specificFeedback); // for a user
feedbackRouter.get('/onefeedback/:id', onespecificFeedback); // by feedback id
feedbackRouter.put('/updatefeedback/:id', updateFeedback);
feedbackRouter.delete('/deletefeedback/:id', deleteFeedback);


export default feedbackRouter;