import { poolRequest, sql } from "../Utils/dbConnect.js"

export const createEmailService = async (id, EmailDetails) => {
    try {
        const currentDate = new Date().toLocaleTimeString();
        const result = await poolRequest()
            .input('AdminID', sql.Int, id)
            .input('UserID', sql.Int, EmailDetails.UserID)
            .input('Date', sql.VarChar, currentDate)
            .input('Subject', sql.VarChar, EmailDetails.Subject)
            .input('Email', sql.VarChar, EmailDetails.Email)

        const query = `
    INSERT INTO Emails (AdminID, UserID, Date, Subject, Email)
    VALUES (@AdminID, @UserID, @Date, @Subject, @Email)
    `

        await result.query(query);

        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const createEmailServiceToAdmin = async (id,AdminID,Subject, Email) => {
    try {
        const currentDate = new Date().toLocaleTimeString();
        const result = await poolRequest()
            .input('UserID', sql.Int, id)
            .input('AdminID', sql.Int,AdminID)
            .input('Date', sql.VarChar, currentDate)
            .input('Subject', sql.VarChar,Subject)
            .input('Email', sql.VarChar,Email)

        const query = `
    INSERT INTO Emails (UserID, AdminID, Date, Subject, Email)
    VALUES (@UserID, @AdminID, @Date, @Subject, @Email)
    `

        await result.query(query);

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting all Emails
export const allEmailsService = async () => {
    try {
        const result = await poolRequest()
            .query("SELECT * FROM Emails")

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting posts belonging to a specific user
export const specificEmailService = async (id) => {
    try {
        const result = await poolRequest()
            .input("UserID", sql.Int, id)
            .query('SELECT * FROM Emails WHERE UserID = @UserID ')
            return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting one Email
export const onespecificEmailService = async (id) => {
    try {
        const result = await poolRequest()
            .input("EmailID", sql.Int, id)
            .query(`SELECT * FROM Emails WHERE EmailID = @EmailID`)

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for updating a record
export const updateEmailService = async (id, EmailtDetails) => {
    try {
        const updateFields = Object.keys(EmailtDetails).map(key => `${key} = @${key}`).join(', ');

        const request = poolRequest()
            .input("EmailID", sql.Int, id);

        for (const [key, value] of Object.entries(EmailtDetails)) {
            request.input(key, sql.VarChar(255), value);
        }

        const result = await request.query(`UPDATE Emails SET ${updateFields} WHERE EmailID = @EmailID `);
        return result;
    } catch (error) {
        return error;
    }
}

//service for deleting an email 
export const deleteEmailService = async (id) => {
    try {
        const result = await poolRequest()
            .input("EmailID", sql.Int, id)
            .query(`DELETE FROM Emails WHERE EmailID = @EmailID`)
        return result;
    } catch (error) {
        return error;
    }
}