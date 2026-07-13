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
        `SELECT * FROM jobs
         WHERE title LIKE ?
            OR description LIKE ?
         ORDER BY createdAt DESC`,
        [`%${keyword}%`, `%${keyword}%`]
    );

    return rows;
};

export const getAdminJobsDatabase = async (adminId) => {
    const [rows] = await pool.query(
        `SELECT * FROM jobs
         WHERE createdBy = ?
         ORDER BY createdAt DESC`,
        [adminId]
    );

    return rows;
};