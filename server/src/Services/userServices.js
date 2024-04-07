import { poolRequest, sql } from "../Utils/dbConnect.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// service for creating a user
export const createUserService = async (userData) => {
    try {
        const { FirstName, LastName, Email, Password, NationalID, County, Residence, PhoneNumber, Occupation, Gender, DateOfBirth, PhotoURL, Role } = userData;
        // Check if the email already exists
        const emailCheckQuery = `
                SELECT COUNT(*) AS count
                FROM Users
                WHERE Email = @Email
            `;

        const emailCheckResult = await poolRequest()
            .input('Email', sql.VarChar(255), Email)
            .query(emailCheckQuery);

        const existingEmailCount = emailCheckResult.recordset[0].count;

        if (existingEmailCount > 0) {
            return { message: 'A user with that email already exists' };
        }

        // If the email does not exist, proceed with insertion
        const insertQuery = `
        INSERT INTO Users (FirstName, LastName, Email, Password, NationalID, County, Residence, PhoneNumber, Occupation, Gender, DateOfBirth, PhotoURL, Role)
        VALUES (@FirstName, @LastName, @Email, @Password, @NationalID, @County, @Residence, @PhoneNumber, @Occupation, @Gender, @DateOfBirth, @PhotoURL, @Role);
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
            .input('Occupation', sql.VarChar(255), Occupation)
            .input('Gender', sql.VarChar(255), Gender)
            .input('DateOfBirth', sql.VarChar(255), DateOfBirth)
            .input('PhotoURL', sql.VarChar(255), PhotoURL)
            .input('Role', sql.VarChar(255), Role)
            .query(insertQuery);

        return result.recordset;

    } catch (error) {
        return error;
    }
}

//service for users login
export const loginAsUserService = async (loginData) => {
    try {
        const result = await poolRequest()
            .input('Email', sql.VarChar(255), loginData.Email)
            .query("SELECT * FROM Users WHERE Email = @Email");


        // check whether such a user exists
        if (!result || result.recordset.length === 0) {
            console.log("No such user exists");
            return { token: null };
        }

        const { UserID, Password: hashedPassword } = result.recordset[0];
        const passwordMatch = await bcrypt.compare(loginData.Password, hashedPassword);

        if (!passwordMatch) {
            console.log("Passwords don't match");
            return { token: null }; // Return null token if passwords don't match
        }

        // generate a token if passwords match
        const token = jwt.sign({ UserID }, process.env.JWT_SECRET, { expiresIn: '48h' });
        console.log("Generated token:", token);
        return { token }, result.recordset;
    } catch (error) {
        console.error("Error in loginAsUserService:", error);
        return { message: "Internal server error" };
    }
}

//service for getting a user by its id
export const getUserByIdService = async (id) => {
    try {
        const result = await poolRequest()
            .input("UserID", sql.Int, id)
            .query("SELECT * FROM Users WHERE UserID = @UserID")
        return result.recordset;
    } catch (error) {
        return error;
    }
}

//service for getting all users
export const getAllUsersServices = async () => {
    try {
        const result = await poolRequest()
            .query("SELECT * FROM Users")
        return result;
    } catch (error) {
        return error;
    }
}

//service for updating a user details
export const updateUserDetailsService = async (id, updateDetails) => {
    try {
        const updateFields = Object.keys(updateDetails).map(key => `${key} =@${key}`).join(', ');

        const request = poolRequest()
            .input("UserID", sql.Int, id);

        for (const [key, value] of Object.entries(updateDetails)) {
            request.input(key, sql.VarChar(255), value)
        }

        const result = await request.query(`UPDATE Users SET ${updateFields} WHERE UserID = @UserID `);
        return result;
    } catch (error) {
        return error;
    }
}

//service for deleting a user
export const deleteUserService = async (id) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.Int, id)
            .query("DELETE FROM Users WHERE UserID = @UserID");
    } catch (error) {
        return error;
    }
}