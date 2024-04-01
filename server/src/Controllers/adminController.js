import { deleteAdminService, getAllAdminsService, adminDetailsService, createAdminService, loginAsAdminService, updateAdminDetailsService } from "../Services/adminServices.js";

// controller for registering an admin  
export const registerAdmin = async (req, res) => {
    const adminData = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
        NationalID: req.body.NationalID,
        County: req.body.County,
        Residence: req.body.Residence,
        PhoneNumber: req.body.PhoneNumber,
        Gender: req.body.Gender,
        DateOfBirth: req.body.DateOfBirth,
        PhotoURL: req.body.PhotoURL
    };
    console.log("Request Body", adminData);
    try {
        const result = await createAdminService(adminData);
        return res.status(201).json({ message: "Admin created successfully", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//controller for loggin in as an admin
export const LoginAsAdmin = async (req, res) => {
    const loginData = {
        Email: req.body.Email,
        Password: req.body.Password
    }
    console.log("Request Body", loginData);
    try {
        const result = await loginAsAdminService(loginData);
        return res.status(201).json({ message: "logged in as admin", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//controller for getting admin details by id
export const adminDetails = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await adminDetailsService(id);
        if (result.length === 0){
            return res.status(404).json({ message: "Admin not found" });
        } else {
            return res.status(201).json({ result });
        }
    } catch (error) {
        return error;
    }
}

//controller for updating admin details
export const updateAdminDetails = async (req, res) => {
    try {
        const id = Number(req.params.id);
        // Look for the admin in the database
        const searchAdmin = await adminDetailsService(id);
        if (searchAdmin.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        } else {
            let adminData = {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                Password: req.body.Password,
                NationalID: req.body.NationalID,
                County: req.body.County,
                Residence: req.body.Residence,
                PhoneNumber: req.body.PhoneNumber,
                Gender: req.body.Gender,
                DateOfBirth: req.body.DateOfBirth,
                PhotoURL: req.body.PhotoURL
            };

            // Filter out undefined values from adminData
            adminData = Object.fromEntries(Object.entries(adminData).filter(([_, value]) => value !== undefined));

            const result = await updateAdminDetailsService(id, adminData);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            } else {
                return res.status(201).json({ message: "Admin updated successfully", result });
            }
        }
    } catch (error) {
        console.error("Error in updateAdminDetails:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//controller for getting all admins
export const allAdmins = async (req, res) =>{
    try {
        const data = await getAllAdminsService();
        if (data.length === 0){
            return res.status(404).json({ message: "No admins found" });
        } else {
            return res.status(201).json({message: "admins found", data})
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
}

//controller for deleting an admin
export const deleteAdmin = async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const adminToDelete = await adminDetailsService(id);
        if (adminToDelete === 0) {
            return res.status(404).json({ message: "Admin not found" });
        } else {
            const result = await deleteAdminService(id);
            if (result.message) {
                return res.status(500).json({ message: result.message });
            } else {
                return res.status(201).json({ message: `admin with id ${id} deleted successfully`, result });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
