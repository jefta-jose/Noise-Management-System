import { poolRequest, sql } from "../Utils/dbConnect.js";

//service for creating a notification
export const createNotificationService = async (id, notificationDetails) => {
    try {
        //get the current time
        const currentTime = new Date().toLocaleTimeString();
        const result = await poolRequest()
            .input("AdminID", sql.Int, id)
            .input("Type", sql.VarChar, notificationDetails.Type)
            .input("Date", sql.VarChar, currentTime)
            .input("Status", sql.VarChar, notificationDetails.Status)
            .input("Description", sql.VarChar, notificationDetails.Description)

        const query = `
        INSERT INTO Notifications(AdminID, Type, Date, Status, Description)
        VALUES (@AdminID, @Type, @Date, @Status, @Description)
        `

        await result.query(query);

        return result.recordset;

    } catch (error) {
        return error;
    }
}

//service for getting all reports
export const allNotificationsService = async () => {
    try {
        const result = await poolRequest()
            .query("SELECT * FROM Notifications")

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting one report
export const onespecificNotificationService = async (id) => {
    try {
        const result = await poolRequest()
            .input("NotificationID", sql.Int, id)
            .query(`SELECT * FROM Notifications WHERE NotificationID = @NotificationID`)

        return result.recordset;
    } catch (error) {
        return error;
    }
}


//service for updating a notification
export const updateNotificationService = async (id, notificationDetails) => {
    try {
        const updateFields = Object.keys(notificationDetails).map(key => `${key} = @${key}`).join(', ');

        const request = poolRequest()
            .input("NotificationID", sql.Int, id);

        for (const [key, value] of Object.entries(notificationDetails)) {
            request.input(key, sql.VarChar(255), value);
        }

        const result = await request.query(`UPDATE Notifications SET ${updateFields} WHERE NotificationID = @NotificationID `);

        return result;
    } catch (error) {
        return error;
    }
}

//service for deleting a notification
export const deleteNotificationService = async (id) => {
    try {
        const result = poolRequest()
            .input("NotificationID", sql.Int, id)
            .query("DELETE FROM Notifications WHERE NotificationID= @NotificationID ")
    } catch (error) {
        return error;
    }
}