import pool from "../config/db.js";

export const getUserByPhone= async(phoneNumber)=>{
    const [rows]=await pool.query(
        `SELECT * FROM users 
          WHERE phoneNumber=?`,
          [phoneNumber]
    )

    return rows;
};

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows;
};

export const createUser=async(fullname,email,phoneNumber,password,role)=>{
        const [result]=await pool.query(
            `INSERT INTO users
             (fullname,email,phoneNumber,password,role)
             VALUES(?,?,?,?,?)`,
             [fullname,email,phoneNumber,password,role]
        );
        return result;
};

export const updateUserProfile = async (id,  fullname,email,phoneNumber,bio,skills,profilePhoto) => {
    const [result] = await pool.query(
        `UPDATE users
          SET fullname = ?,
             email = ?,
             phoneNumber = ?,
             bio = ?,
             skills = ?,
             profilePhoto = ?
         WHERE id = ?`,
        [fullname,email,phoneNumber,bio,skills,profilePhoto,id]
    );

    return result;
};