import { poolRequest, sql } from "../Utils/dbConnect.js"

export const createFeedbackService = async (id, feedbackDetails) => {
    try {
        const currentDate = new Date().toLocaleTimeString();
        const result = await poolRequest()
            .input('AdminID', sql.Int, id)
            .input('UserID', sql.Int, feedbackDetails.UserID)
            .input('Date', sql.VarChar, currentDate)
            .input('Message', sql.VarChar, feedbackDetails.Message)

        const query = `
    INSERT INTO Feedback (AdminID, UserID, Date, Message)
    VALUES (@AdminID, @UserID, @Date, @Message)
    `

        await result.query(query);

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting all feedbacks
export const allFeedbacksService = async () => {
    try {
        const result = await poolRequest()
            .query("SELECT * FROM Feedback")

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting posts belonging to a specific user
export const specificFeedbackService = async (id) => {
    try {
        const result = await poolRequest()
            .input("UserID", sql.Int, id)
            .query(`SELECT * FROM Feedback WHERE UserID = @UserID`)

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting one feedback
export const onespecificFeedbackService = async (id) => {
    try {
        const result = await poolRequest()
            .input("FeedBackID", sql.Int, id)
            .query(`SELECT * FROM Feedback WHERE FeedBackID = @FeedBackID`)

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for updating a record
export const updateFeedbackService = async (id, feedbacktDetails) => {
    try {
        const updateFields = Object.keys(feedbacktDetails).map(key => `${key} = @${key}`).join(', ');

        const request = poolRequest()
            .input("FeedbackID", sql.Int, id);

        for (const [key, value] of Object.entries(feedbacktDetails)) {
            request.input(key, sql.VarChar(255), value);
        }

        const result = await request.query(`UPDATE Feedback SET ${updateFields} WHERE FeedbackID = @FeedbackID `);
        return result;
    } catch (error) {
        return error;
    }
}

//service for deleting a user 
export const deleteFeedbackService = async (id) => {
    try {
        const result = await poolRequest()
            .input("FeedbackID", sql.Int, id)
            .query(`DELETE FROM Feedback WHERE FeedbackID = @FeedbackID`)
        return result;
    } catch (error) {
        return error;
    }
}