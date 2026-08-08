import pool from "../config/db.js";

export const createJobDatabase = async (title,description, requirements, salary, experienceLevel, location,jobType,
  position, companyId, createdBy) => {
  const [result] = await pool.query(
    `INSERT INTO jobs
    (title, description, requirements, salary, experienceLevel,
     location, jobType, position, companyId, createdBy)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, description, requirements, salary, experienceLevel, location, jobType, position, companyId, createdBy, ]
  );

  return result;
};

export const getJobByIdDatabase = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM jobs WHERE id = ?",
        [id]
    );

    return rows;
};

export const getAllJobsDatabase = async (keyword) => {
    const [rows] = await pool.query(
        `SELECT jobs.*,
                companies.id AS company_id,
                companies.companyName AS company_companyName,
                companies.logo AS company_logo,
                companies.location AS company_location
         FROM jobs
         JOIN companies ON jobs.companyId = companies.id
         WHERE jobs.title LIKE ?
            OR jobs.description LIKE ?
         ORDER BY jobs.createdAt DESC`,
        [`%${keyword}%`, `%${keyword}%`]
    );

    return rows.map((row) => ({
        ...row,
        company: {
            id: row.company_id,
            name: row.company_companyName,
            logo: row.company_logo,
            location: row.company_location,
        },
    }));
};
export const getAdminJobsDatabase = async (adminId) => {
    const [rows] = await pool.query(
        `SELECT jobs.*,
                companies.id AS company_id,
                companies.companyName AS company_companyName,
                companies.logo AS company_logo,
                companies.location AS company_location
         FROM jobs
         JOIN companies ON jobs.companyId = companies.id
         WHERE jobs.createdBy = ?
         ORDER BY jobs.createdAt DESC`,
        [adminId]
    );

    return rows.map((row) => ({
        ...row,
        company: {
            id: row.company_id,
            name: row.company_companyName,
            logo: row.company_logo,
            location: row.company_location,
        },
    }));
};