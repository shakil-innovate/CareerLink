const db=require('../config/db');

const findUserByEmail=async(email)=>{
    const [row]=await db.query(
        `SELECT * FROM users  WHERE email   =? `,
        [email]
    );

    return row[0];
}

const createUser=async (userData)=>{
   const {full_name,email,password,phone,role} = userData;
    
   const [result]=await db.query(
    `INSERT INTO users
    (full_name,email,password,phone,role)
    VALUES (?,?,?,?,?)`,
    [full_name,email,password,phone,role]
   );

   return result.insertId;
};

module.exports={findUserByEmail,createUser};