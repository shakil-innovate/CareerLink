    import jwt from "jsonwebtoken";

export const authenticateToken= async(req,res,next)=>{
    try{
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"No token provided",
                success:false
            })
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

       req.id = decoded.id;
        next();
    }catch(error){
         console.log(error);

        return res.status(500).json({
            message: "Invalid token",
            success: false
        });
    }
}