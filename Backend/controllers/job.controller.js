import { createJobDatabase,getAllJobsDatabase,getJobByIdDatabase,getAdminJobsDatabase } from "../queries/job.queries.js";

// Recruiter Job Posting
//job posting by admin
export const postJob = async (req, res) => {
  try {
    const { title,  description, requirements,  salary,  location,  jobType,  experience, 
         position,  companyId, } = req.body;

    const userId = req.id;

    if (  !title ||  !description || !requirements ||  !salary ||  !location ||  !jobType ||  !experience ||  !position ||
      !companyId ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const result = await createJobDatabase(  title,  description,  requirements,  salary,  experience,  location,
      jobType,  position,  companyId,  userId);

    return res.status(201).json({
      success: true,
      message: "Job posted successfully.",
      jobId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await getAllJobsDatabase(keyword);

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const jobs = await getJobByIdDatabase(jobId);

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job: jobs[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Admin created job filter
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await getAdminJobsDatabase(adminId);

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found",
            });
        }

        return res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
