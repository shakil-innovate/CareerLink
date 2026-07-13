import express  from 'express';
import cookieParser  from 'cookie-parser';
import cors from "cors";
import pool, { connectDB } from "./config/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";


const app=express();

//middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOption={
    origin:["https://localhost:5121"],
    credentials:true
};

//api
app.use("/api/users",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);

app.use(cors(corsOption));

const PORT=5001;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);   
});