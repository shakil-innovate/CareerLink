import pool from "../config/db.js";

export const getApplicationByJobAndApplicant = async (jobId, applicantId) => {
    const [rows] = await pool.query(
        `SELECT * FROM applications
         WHERE jobId = ? AND applicantId = ?`,
        [jobId, applicantId]
    );

    return rows;
};

export const getJobById = async (jobId) => {
    const [rows] = await pool.query(
        "SELECT * FROM jobs WHERE id = ?",
        [jobId]
    );

    return rows;
};

export const createApplication = async (jobId, applicantId) => {
    const [result] = await pool.query(
        `INSERT INTO applications (jobId, applicantId)
         VALUES (?, ?)`,
        [jobId, applicantId]
    );

    return result;
};

export const getAppliedJobsDatabase = async (applicantId) => {
    const [rows] = await pool.query(
        `SELECT  applications.*, jobs.title,  jobs.description,
            jobs.salary, jobs.location, jobs.jobType,  jobs.experienceLevel,
                companies.companyName AS companyName
            FROM applications
        JOIN jobs
            ON applications.jobId = jobs.id
        JOIN companies
            ON jobs.companyId = companies.id
        WHERE applications.applicantId = ?
        ORDER BY applications.createdAt DESC`,
        [applicantId]
    );

    return rows;
};

export const getApplicantsDatabase = async (jobId) => {
    const [rows] = await pool.query(
        `SELECT    applications.id, applications.status, applications.createdAt, users.id AS applicantId,
            users.fullname, users.email, users.phoneNumber, users.profilePhoto
        FROM applications
        JOIN users
            ON applications.applicantId = users.id
        WHERE applications.jobId = ?
        ORDER BY applications.createdAt DESC`,
        [jobId]
    );

    return rows;
};

export const getApplicationById = async (applicationId) => {
    const [rows] = await pool.query(
        "SELECT * FROM applications WHERE id = ?",
        [applicationId]
    );

    return rows;
};

export const updateApplicationStatus = async (applicationId, status) => {
    const [result] = await pool.query(
        `UPDATE applications
         SET status = ?
         WHERE id = ?`,
        [status, applicationId]
    );

    return result;
};