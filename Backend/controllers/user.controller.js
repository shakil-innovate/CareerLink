import { getUserByPhone,getUserByEmail,getUserById, createUser,updateUserProfile } from "../queries/user.queries.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/generateToken.js";


export const register=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,password,role}=req.body;
         

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Missing Requirement fields",
                success:false
            });
        }

        const phoneRows=await getUserByPhone(phoneNumber);

        if(phoneRows.length > 0){
            return res.status(400).json({
                message:"Phone number is already registerd",
                success:false
            });
        }

        const emailRows = await getUserByEmail(email);

        if (emailRows.length > 0) {
            return res.status(400).json({
                message: "Email already registered",
                success: false
            });
        }

        //convert password to hash

        const hashedPassword=await bcrypt.hash(password,10);

        await createUser(fullname,email,phoneNumber,hashedPassword,role);

        return res.status(201).json({
            message:`Account created successfully, ${fullname}`,
            success:true
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error register",
            success:false
        });
    }
};

export const login=async(req,res)=>{
    try{    
        const {email,password,role}=req.body;
        if( !email || !password || !role ){
            return res.status(400).json({
                message:"Missing Requirement fields",
                success:false
            });
        }


        let user = await getUserByEmail(email);
        if (user.length==0) {
            return res.status(404).json({
                message: "UserEmail not exist",
                success: false
            });
        }

        user=user[0];

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
             return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if(user.role!=role){
             return res.status(403).json({
                message: "User role doesn't match",
                success: false
            });
        }

        const token = generateToken(user);

       user = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            bio: user.bio,
            skills: user.skills,
            resume: user.resume,
            companyId: user.companyId,
            profilePhoto: user.profilePhoto,
            isVerified: user.isVerified
        };

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite:"Strict"
        }).status(200).json({
            message:`Logged in Successfully , ${user.fullname}`,
            success:true,
            user
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error login",
            success:false
        });
    }
};  

export const logout=async(req,res)=>{
    try{
        res.status(200).cookie("token","",{
            maxAge:0
        }).json({
            message:`Loggedout successfully`,
            success:true
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error logout",
            success:false
        });
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

          if(!fullname || !email || !phoneNumber ){
            return res.status(400).json({
                message:"Missing Requirement fields",
                success:false
            });
        }

        const userId = req.id;

        let user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Upload profile photo if provided
        let profilePhoto = user.profilePhoto;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            profilePhoto = cloudResponse.secure_url;
        }

        // Keep old values if new ones are not provided
        const updatedFullname = fullname || user.fullname;
        const updatedEmail = email || user.email;
        const updatedPhoneNumber = phoneNumber || user.phoneNumber;
        const updatedBio = bio || user.bio;

        const updatedSkills = skills
            ? JSON.stringify(skills.split(","))
            : user.skills;

        await updateUserProfile(userId,updatedFullname,updatedEmail,updatedPhoneNumber,updatedBio,updatedSkills,profilePhoto);

        user = await getUserById(userId);

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error updating profile",
            success: false
        });
    }
};