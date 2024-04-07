import { createUserService, loginAsUserService, getUserByIdService, getAllUsersServices, updateUserDetailsService, deleteUserService } from "../Services/userServices.js";


// controller for registering a user
export const registerUser = async (req, res) => {
    try {
        const userData = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: req.body.Password,
            NationalID: req.body.NationalID,
            County: req.body.County,
            Residence: req.body.Residence,
            PhoneNumber: req.body.PhoneNumber,
            Occupation: req.body.Occupation,
            Gender: req.body.Gender,
            DateOfBirth: req.body.DateOfBirth,
            PhotoURL: req.body.PhotoURL,
            Role: req.body.Role
        };

        const result = await createUserService(userData);

        if (result && result.message) {
            // If createUserService returns a message, there was an error
            return res.status(400).json({ message: result.message });
        } else {
            // Otherwise, user created successfully
            return res.status(201).json({ message: "User created successfully", result });
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in registerUser:", error);
        // Send an appropriate error response to the client
        return res.status(500).json({ message: "Internal server error" });
    }
}

//controller for user login
export const LoginAsUser = async (req, res) => {
    try {
        const loginData = {
            Email: req.body.Email,
            Password: req.body.Password
        };
        console.log('loginData', loginData)

        const result = await loginAsUserService(loginData);
        if (result && result.message) {
            return res.status(400).json({ message: result.message });
        } else {
            return res.status(201).json({ message: "logged in as user", result });
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

//controller for getting a user by id
export const userDetails = async (req,res) =>{
    try {
        const id = req.params.id;
        const result = await getUserByIdService(id);
        if (result === 0){
            return res.status(500).json({message: "user not found"})
        } else{
            return res.status(201).json({result})
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
}

//controller for getting all users
export const allUsers = async (req,res) =>{
    try {
        const result = await getAllUsersServices()
        if (result === 0){
            return res.status(404).json({message: "no users found"});
        } else{
            return res.status(201).json({result});
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for updating a user detail
export const updateUserDetails = async (req, res) => {
    try {
        const id = Number(req.params.id);
        // look for the user
        const searchUser = await getUserByIdService(id);
        if (searchUser.length === 0){
            return res.status(404).json({message: "user does not exist"})
        } else{
            let updateDetails = {
                Email: req.body.Email,
                Password: req.body.Password,
                County: req.body.County,
                Residence: req.body.Residence,
                PhoneNumber: req.body.PhoneNumber,
                Occupation: req.body.Occupation,
                PhotoURL: req.body.PhotoURL,
                Role: req.body.Role
            };


        // filter out undefined valeus from updateDetails
        updateDetails = Object.fromEntries(Object.entries(updateDetails).filter(([_, value]) => value !== undefined));

        const result = await updateUserDetailsService(id, updateDetails);
        if(result.message){
            return res.status(500).json({message: result.message});
        } else{
            return res.status(201).json({message: `user with ${id} updates successfully`, result})
        }
    }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for deleting a user
export const deleteUser = async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const searchUser = await getUserByIdService(id);

        if(searchUser.length ===0){
            return res.status(404).json({message: "user does not exist"});
        } else {
            const result = await deleteUserService(id);
            if (result && result.message){
                return res.status(500).json({message: result.message});
            } else {
                return res.status(201).json({message: `user with id ${id} successfully deleted`});
            }
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}