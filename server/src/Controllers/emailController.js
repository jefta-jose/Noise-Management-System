import { createEmailServiceToAdmin, createEmailService, allEmailsService, specificEmailService, onespecificEmailService, updateEmailService, deleteEmailService } from "../Services/emailServices.js";

//controller for creating an Email to user
export const createEmail = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const EmailDetails = {
            UserID: req.body.UserID,
            Date: req.body.Date,
            Subject: req.body.Subject,
            Email: req.body.Email,
        }

        const result = createEmailService(id, EmailDetails);
        console.log('EmailDetails', EmailDetails)
        if (result && result.message) {
            return res.status(500).json({ message: result.message })
        } else {
            return res.status(201).json({ message: "Email created successfully", result })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

//controller for creating a Email to admin 
// Controller for creating an Email to admin
export const createEmailToAdmin = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const EmailDetails = {
            AdminID: req.body.AdminID,
            Date: req.body.Date,
            Subject: req.body.Subject,
            Email: req.body.Email,
        };

        const result = await createEmailServiceToAdmin(
            id,
            EmailDetails.AdminID,
            EmailDetails.Subject,
            EmailDetails.Email
        );

        console.log('EmailDetails', EmailDetails);

        if (result && result.message) {
            return res.status(500).send(result);
        } else {
            return res.status(201).send(result);
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};


//controller for getting all Emails
export const allEmails = async (req, res) => {
    try {
        const result = await allEmailsService();
        if (result.length === 0) {
            return res.status(404).json({ message: "no Emails sent to users" });
        } else {
            return res.status(201).json({ message: "all Emails", result });
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

//controller for getting Email for a specific user 
export const specificEmail = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await specificEmailService(id);

        if (result && result.message) {
            return res.status(500).json({ message: result.message });
        } else {
            return res.status(201).send(result);
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

//controller for getting one Email
export const onespecificEmail = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await onespecificEmailService(id);

        if (result && result.message) {
            return res.status(500).json({ message: result.message });
        } else {
            return res.status(201).json({ message: `Email with id ${id}`, result });
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

//controller for updating a Email
export const updateEmail = async (req, res) => {
    try {
        const id = Number(req.params.id);

        //check if the report exists
        const checkEmail = await onespecificEmailService(id);
        if (checkEmail.length === 0) {
            return res.status(404).json({ message: "Email does not exist" })
        } else {
            let EmailtDetails = {
                Date: req.body.Date,
                Subject: req.body.Subject,
                Email: req.body.Email,

            }

            //filter out undefined values
            EmailtDetails = Object.fromEntries(Object.entries(EmailtDetails).filter(([_, value]) => value !== undefined));

            const result = await updateEmailService(id, EmailtDetails);
            if (result && result.message) {
                return res.status(500).json({ message: result.message })
            } else {
                return res.status(201).json({ message: `report with id ${id} updated`, result });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

//controller for deleting a Email
export const deleteEmail = async (req, res) => {
    try {
        const id = Number(req.params.id);

        //check if the report exists
        const checkEmail = await onespecificEmailService(id);
        if (checkEmail.length === 0) {
            return res.status(404).json({ message: "Email does not exist" })
        } else {
            const result = await deleteEmailService(id);

            if (result === 0) {
                return res.status(404).json({ message: "Email does not exist" });
            } else {
                return res.status(201).json({ message: `Email with id ${id} deleted` });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}