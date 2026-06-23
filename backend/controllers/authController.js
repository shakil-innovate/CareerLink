const authService=require('../services/authService');

const signup=async (req,res)  =>{
    try{
        const result=await authService.signup(req.body);

        res.status(201).json({
            success:true,
            ...result
        });

    }catch(err){
        res.status(err.status || 500 ).json({
            success:false,
            message:err.message
        });
    }
};

const signin=async (req,res)=>{
    try{
        const result=await authService.signin(req.body);

        res.status(201).json({
            success:true,
            ...result
        });
    }catch(err){
        res.status(err.status || 500).json({
            success:false,
           message: err.message

        });
    }
};

module.exports={signup,signin};