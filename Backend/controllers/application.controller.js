import {
    getApplicationByJobAndApplicant, getJobById, createApplication,
    getAppliedJobsDatabase, getApplicantsDatabase,
    getApplicationById,updateApplicationStatus
} from "../queries/application.queries.js";

export const applyJob = async (req, res) => {
    try {
        const applicantId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Invalid job id",
            });
        }

        // Check if the user has already applied
        const existingApplication = await getApplicationByJobAndApplicant(
            jobId,
            applicantId
        );

        if (existingApplication.length > 0) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        // Check if the job exists
        const job = await getJobById(jobId);

        if (job.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Create a new application
        await createApplication(jobId, applicantId);

        return res.status(201).json({
            success: true,
            message: "Application submitted",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const applicantId = req.id;

        const applications = await getAppliedJobsDatabase(applicantId);

        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found",
            });
        }

        return res.status(200).json({
            success: true,
            applications,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const applicants = await getApplicantsDatabase(jobId);

        if (applicants.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found or no applicants found",
            });
        }

        return res.status(200).json({
            success: true,
            applicants,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        // Check if the application exists
        const application = await getApplicationById(applicationId);

        if (application.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        // Update the status
        await updateApplicationStatus(
            applicationId,
            status.toLowerCase()
        );

        return res.status(200).json({
            success: true,
            message: "Application status updated",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};