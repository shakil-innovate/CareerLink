require('dotenv').config();
const express=require('express');
const db=require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Job portal API is Running');
});

app.use('/api/auth', authRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,async()=>{
    try{
        await db.getConnection();
        console.log("✅ MySQL Connected to Job_portal");
    }catch(err){
        console.error("❌ MySQL Connection Failed:", err.message);
    }
    console.log(`Server running on http://localhost:${PORT}`);
})