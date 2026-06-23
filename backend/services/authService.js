    const {findUserByEmail,createUser}= require('../models/userModel');
    const {hashPassword,comparePassword}=require('../utils/password');
    const {generateToken} = require('../utils/jwt');

    const signup=async(data)=>{

        const {full_name,email,password,phone,role}=data;
        if(!full_name || !email || !password || !phone ){
            const error=new Error('All required fields must be provided');
            error.status=400;
            throw error;
        }

        const existingUser=await findUserByEmail(email);

        if(existingUser){
            const error=new Error('Email already exists');
            error.status=409;
            throw error;
        }

        const hashedPassword= await hashPassword(password,10);

        const userId=await createUser({
        full_name,
        email,
        password:hashedPassword,
        phone,
        role
        });

        return {
            message:'User registered successfully',
            userId
        };
    };

    const signin=async(data)=>{
        const {email,password}=data;

        if(!email || !password){
            const error=new Error('All required fields must be provided');
            error.status=400;
            throw error;
        }
        
        const user=await findUserByEmail(email);

        if(!user){
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }

        if(!user.is_active){
            const error = new Error('Your account has been suspended');
            error.status = 403;
            throw error;
        }

        const passwordMatch=await comparePassword(password,user.password);

        if(!passwordMatch){
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }

        const token=generateToken({id:user.id,role:user.role});

        return{
            message:'Signed in successfully',
            token,
            user:{
                id:user.id,
                full_name:user.full_name,
                email:user.email,
                phone:user.phone,
                role:user.role,
                is_verified:user.is_verified
            }
        };
    };

    module.exports={signup,signin};



