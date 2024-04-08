import { createFeedbackService, allFeedbacksService, specificFeedbackService, onespecificFeedbackService, updateFeedbackService, deleteFeedbackService } from "../Services/feedbackService.js";

//controller for creating a feedback
export const createFeedback = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const feedbackDetails = {
            UserID: req.body.UserID,
            Date: req.body.Date,
            Message: req.body.Message,
        }

        const result = createFeedbackService(id, feedbackDetails);
        if (result && result.message) {
            return res.status(500).json({ message: result.message })
        } else {
            return res.status(201).json({ message: "feedback created successfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

//controller for getting all feedbacks
export const allFeedbacks = async (req, res) => {
    try {
        const result = await allFeedbacksService();
        if (result === 0) {
            return res.status(404).json({ message: "no feedbacks sent to users"});
        } else {
            return res.status(201).json({ message: "all feedbacks", result});
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

//controller for getting feedback for a specific user 
export const specificFeedback = async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const result = await specificFeedbackService(id);

        if (result && result.message){
            return res.status(500).json({message: result.message});
        } else{
            return res.status(201).send(result);
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for getting one feedback
export const onespecificFeedback = async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const result = await onespecificFeedbackService(id);

        if (result && result.message){
            return res.status(500).json({message: result.message});
        } else{
            return res.status(201).json({message: `feedback with id ${id}`, result});
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for updating a feedback
export const updateFeedback = async (req,res) =>{
    try {
        const id = Number(req.params.id);

        //check if the report exists
        const checkFeedback = await onespecificFeedbackService(id);
        if(checkFeedback.length === 0){
            return res.status(404).json({message: "feedback does not exist"})
        } else{
            let feedbacktDetails = {
                Date: req.body.Date,
                Message: req.body.Message
            }

            //filter out undefined values
            feedbacktDetails = Object.fromEntries(Object.entries(feedbacktDetails).filter(([_, value]) => value !== undefined));

            const result = await updateFeedbackService(id, feedbacktDetails);
            if(result && result.message){
                return res.status(500).json({message: result.message})
            } else{
                return res.status(201).json({message: `report with id ${id} updated`, result});
            }
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for deleting a feedback
export const deleteFeedback = async (req,res) =>{
    try {
        const id = Number(req.params.id);

        //check if the report exists
        const checkFeedback = await onespecificFeedbackService(id);
        if(checkFeedback.length === 0){
            return res.status(404).json({message: "feedback does not exist"})
        } else{
        const result = await deleteFeedbackService(id);
        
        if(result === 0){
            return res.status(404).json({message: "feedback does not exist"});
        } else {
            return res.status(201).json({message: `feedback with id ${id} deleted`});
        }}
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}