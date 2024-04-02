import { poolRequest, sql } from "../Utils/dbConnect.js";

//service for creating a report
export const createReportService = async (id, reportDetails) => {
    try {
        //get the current time
        const currentTime = new Date().toLocaleTimeString();
        const result = await poolRequest()
        .input("UserID", sql.Int, id)
        .input("Location", sql.VarChar, reportDetails.Location)
        .input("TimeOfReporting", sql.VarChar, currentTime)
        .input("Type", sql.VarChar, reportDetails.Type)
        .input("Description", sql.VarChar, reportDetails.Description)
        .input("NoiseLevel", sql.VarChar, reportDetails.NoiseLevel)
        .input("SourceOfNoise", sql.VarChar, reportDetails.SourceOfNoise)
        .input("DurationOfNoise", sql.VarChar, reportDetails.DurationOfNoise)
        .input("SupportingDocuments", sql.VarChar, reportDetails.SupportingDocuments)

        const query = `
        INSERT INTO Reports(UserId, Location, TimeOfReporting, Type, Description, NoiseLevel, SourceOfNoise, DurationOfNoise, SupportingDocuments )
        VALUES (@UserID, @Location, @TimeOfReporting, @Type, @Description, @NoiseLevel, @SourceOfNoise, @DurationOfNoise, @SupportingDocuments )
        `
        
        await result.query(query);

        return result.recordset;

    } catch (error) {
        return error;
    }
}

//service for getting all reports
export const allReportsService = async () =>{
    try {
        const result = await poolRequest()
        .query("SELECT * FROM Reports")

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting posts belonging to a specific user
export const specificReportsService = async (id) =>{
    try {
        const result = await poolRequest()
        .input("UserID", sql.Int, id)
        .query(`SELECT * FROM Reports WHERE UserID = @UserID`)

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting one report
export const onespecificReportsService = async (id) =>{
    try {
        const result = await poolRequest()
        .input("ReportID", sql.Int, id)
        .query(`SELECT * FROM Reports WHERE ReportID = @ReportID`)

        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for updating a record
export const updateReportService = async (id, reportDetails) =>{
    try {
        const updateFields = Object.keys(reportDetails).map(key => `${key} = @${key}`).join(', ');

        const request = poolRequest()
        .input("ReportID", sql.Int, id);

        for (const [key, value] of Object.entries(reportDetails)) {
            request.input(key, sql.VarChar(255), value);
        }

        const result = await request.query(`UPDATE Reports SET ${updateFields} WHERE ReportID = @ReportID `);
        return result;
    } catch (error) {
        return error;
    }
}

//service for deleting a user 
export const deleteReportService = async (id) =>{
    try {
        const result = await poolRequest()
        .input("ReportID", sql.Int, id)
        .query(`DELETE FROM Reports WHERE ReportID = @ReportID`)
        return result;
    } catch (error) {
        return error;
    }
}