import { createNotificationService, allNotificationsService, onespecificNotificationService, updateNotificationService, deleteNotificationService } from "../Services/notificationService.js";

//controller for creating a notification
export const createNotification = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const notificationDetails = {
            Type: req.body.Type,
            Date: req.body.Date,
            Status: req.body.Status,
            Description: req.body.Description,
        }

        console.log('notificationDetails', notificationDetails)
        const result = await createNotificationService(id, notificationDetails);
        if (result && result.message) {
            return res.status(500).json({ message: result.message });
        } else {
            return res.status(201).json({ message: "notification created successfull", result })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

//controller for getting all notification
export const allNotifications = async (req, res) => {
    try {
        const result = await allNotificationsService();
        if (result.length === 0) {
            return res.status(404).json({ message: "No notifications available" })
        } else {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//controller for getting one notification
export const onespecificNotification = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await onespecificNotificationService(id);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No such notification found" });
        } else {
            return res.status(200).json({ message: `Notification with id ${id}`, result });
        }
    } catch (error) {
        console.error("Error in onespecificNotification controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//controller for updating a notification
export const updateNotification = async (req, res) => {
    try {
        const id = Number(req.params.id);

        //check if the notification exists
        const checkNotification = await onespecificNotificationService(id);
        if (checkNotification.length === 0) {
            return res.status(404).json({ message: "notification does not exist" })
        } else {
            let notificationDetails = {
                Status: req.body.Status,
            }

            //filter out undefined values
            notificationDetails = Object.fromEntries(Object.entries(notificationDetails).filter(([_, value]) => value !== undefined));

            const result = await updateNotificationService(id, notificationDetails);
            if (result && result.message) {
                return res.status(500).json({ message: result.message })
            } else {
                return res.status(201).json({ message: `notification with id ${id} updated`, result });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

//controller for deleting a notification
export const deleteNotification = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const checkNotification = await onespecificNotificationService(id);
        if (checkNotification === 0){
            return res.status(404).json({message: "notification not found"})
        } else {
            const result = await deleteNotificationService(id);
            return res.status(201).json({message: `notification with id ${id} deleted successfully`, result})
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}