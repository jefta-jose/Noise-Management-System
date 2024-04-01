import { createReportService, allReportsService, specificReportsService, onespecificReportsService, updateReportService, deleteReportService } from "../Services/reportService.js";

//controller for creating a post
export const createReport = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const reportDetails = {
            Location: req.body.Location,
            TimeOfReporting: req.body.TimeOfReporting,
            Type: req.body.Type,
            Description: req.body.Description,
            NoiseLevel: req.body.NoiseLevel,
            SourceOfNoise: req.body.SourceOfNoise,
            DurationOfNoise: req.body.DurationOfNoise,
            SupportingDocuments: req.body.SupportingDocuments
        }

        const result = await createReportService(id, reportDetails);
        if(result && result.message){
            return res.status(500).json({message: result.message});
        } else{
            return res.status(201).json({message: "report created successfull", result})
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for getting all posts
export const allReports = async (req,res) =>{
    try {
        const result = await allReportsService();
        if(result === 0){
            return res.status(404).json({message: "no reports availabe"})
        } else {
            return res.status(201).json({message: "all reports found", result});
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for getting posts for a specific user 
export const specificReports = async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const result = await specificReportsService(id);

        if (result && result.message){
            return res.status(500).json({message: result.message});
        } else{
            return res.status(201).json({message: `reports for user with id ${id}`, result});
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for getting one post
export const onespecificReport = async (req, res) =>{
    try {
        const id = Number(req.params.id);
        const result = await onespecificReportsService(id);

        if (result && result.message){
            return res.status(500).json({message: result.message});
        } else{
            return res.status(201).json({message: `report with id ${id}`, result});
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for updating a report
export const updateReport = async (req,res) =>{
    try {
        const id = Number(req.params.id);

        //check if the report exists
        const checkReport = await onespecificReportsService(id);
        if(checkReport.length === 0){
            return res.status(404).json({message: "report does not exist"})
        } else{
            let reportDetails = {
                Location: req.body.Location,
                TimeOfReporting: req.body.TimeOfReporting,
                Type: req.body.Type,
                Description: req.body.Description,
                NoiseLevel: req.body.NoiseLevel,
                SourceOfNoise: req.body.SourceOfNoise,
                DurationOfNoise: req.body.DurationOfNoise,
                SupportingDocuments: req.body.SupportingDocuments
            }

            //filter out undefined values
            reportDetails = Object.fromEntries(Object.entries(reportDetails).filter(([_, value]) => value !== undefined));

            const result = await updateReportService(id, reportDetails);
            if(result && result.message){
                return res.status(500).json({message: result.message})
            } else{
                return res.status(201).json({message: `report with id ${id} updated`, result});
            }
        }
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}

//controller for deleting a report
export const deleteReport = async (req,res) =>{
    try {
        const id = Number(req.params.id);

        //check if the report exists
        const checkReport = await onespecificReportsService(id);
        if(checkReport.length === 0){
            return res.status(404).json({message: "report does not exist"})
        } else{
        const result = await deleteReportService(id);
        
        if(result === 0){
            return res.status(404).json({message: "report does not exist"});
        } else {
            return res.status(201).json({message: `report with id ${id} deleted`});
        }}
    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}