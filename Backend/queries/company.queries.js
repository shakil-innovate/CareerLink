import pool from "../config/db.js";

export const getCompanyByName = async (companyName) => {
    const [rows] = await pool.query(
        "SELECT * FROM companies WHERE companyName = ?",
        [companyName]
    );

    return rows[0];
};

export const createCompany = async (companyName, userId) => {
    const [result] = await pool.query(
        `INSERT INTO companies (companyName, userId)
         VALUES (?, ?)`,
        [companyName, userId]
    );

    return result;
};

export const getCompanyById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM companies WHERE id = ?",
        [id]
    );

    return rows[0];
};

export const getCompaniesByUserId = async (userId) => {
    const [rows] = await pool.query(
        "SELECT * FROM companies WHERE userId = ?",
        [userId]
    );

    return rows;
};

export const updateCompanyById = async (id,companyName,description,website,location,logo) => {
    const [result] = await pool.query(
        `UPDATE companies
            SET companyName = ?,
             description = ?,
             website = ?,
             location = ?,
             logo = ?
            WHERE id = ?`,
        [companyName,description,website,location,logo,id]
    );

    return result;
};