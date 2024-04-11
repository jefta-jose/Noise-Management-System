import { poolRequest, sql } from "../Utils/dbConnect.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



//service for registering an admin
export const createAdminService = async (adminData) => {
    try {
        const {
            FirstName,
            LastName,
            Email,
            Password,
            NationalID,
            County,
            Residence,
            PhoneNumber,
            Gender,
            DateOfBirth,
            PhotoURL,
            Role
        } = adminData;

        // Check if the email already exists
        const emailCheckQuery = `
            SELECT COUNT(*) AS count
            FROM Admin
            WHERE Email = @Email
        `;

        const emailCheckResult = await poolRequest()
            .input('Email', sql.VarChar(255), Email)
            .query(emailCheckQuery);

        const existingEmailCount = emailCheckResult.recordset[0].count;

        if (existingEmailCount > 0) {
            throw new Error('Email already exists');
        }

        // If the email does not exist, proceed with insertion
        const insertQuery = `
            INSERT INTO Admin (FirstName, LastName, Email, Password, NationalID, County, Residence, PhoneNumber, Gender, DateOfBirth, PhotoURL, Role)
            VALUES (@FirstName, @LastName, @Email, @Password, @NationalID, @County, @Residence, @PhoneNumber, @Gender, @DateOfBirth, @PhotoURL, @Role);
        `;

        //sore a hashed password in the database
        const hashedPassword = await bcrypt.hash(Password, 10);

        const result = await poolRequest()
            .input('FirstName', sql.VarChar(255), FirstName)
            .input('LastName', sql.VarChar(255), LastName)
            .input('Email', sql.VarChar(255), Email)
            .input('Password', sql.VarChar(255), hashedPassword)
            .input('NationalID', sql.VarChar(255), NationalID)
            .input('County', sql.VarChar(255), County)
            .input('Residence', sql.VarChar(255), Residence)
            .input('PhoneNumber', sql.VarChar(255), PhoneNumber)
            .input('Gender', sql.VarChar(255), Gender)
            .input('DateOfBirth', sql.VarChar(255), DateOfBirth)
            .input('PhotoURL', sql.VarChar(255), PhotoURL)
            .input('Role', sql.VarChar(255), Role)

            .query(insertQuery);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};

//service for logging in as an admin
export const loginAsAdminService = async (loginData) => {
    try {
        const result = await poolRequest()
            .input('Email', sql.VarChar(255), loginData.Email)
            .query("SELECT * FROM Admin WHERE Email = @Email");

        return result.recordset;
    } catch (error) {
        // Log the error
        console.error("Error in loginAsAdminService:", error);
        throw error;
    }
}

//service for getting the admin details by id
export const adminDetailsService = async (id) => {
    try {
        const result = await poolRequest()
            .input('AdminID', sql.Int, id)
            .query("SELECT * FROM Admin WHERE AdminID = @AdminID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for updating an admin
export const updateAdminDetailsService = async (id, adminData) => {
    try {
        const updateFields = Object.keys(adminData).map(key => `${key} = @${key}`).join(', ');

        const request = poolRequest()
            .input('AdminID', sql.Int, id);

        for (const [key, value] of Object.entries(adminData)) {
            request.input(key, sql.VarChar(255), value);
        }

        const result = await request.query(`UPDATE Admin SET ${updateFields} WHERE AdminID = @AdminID`);

        return result;
    } catch (error) {
        console.error("Error in updateAdminDetailsService:", error);
        return { message: "Failed to update admin details" };
    }
}

//service for getting all admins
export const getAllAdminsService = async () => {
    try {
        const result = await poolRequest()
            .query("SELECT * FROM Admin");
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const deleteAdminService = async (id) => {
    try {
        const result = await poolRequest()
            .input('AdminID', sql.Int, id)
            .query("DELETE FROM Admin WHERE AdminID = @AdminID");
        return result;
    } catch (error) {
        return error;
    }
}





