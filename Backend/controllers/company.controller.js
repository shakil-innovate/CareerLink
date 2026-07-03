import { createCompany, getCompaniesByUserId, getCompanyById, getCompanyByName, updateCompanyById } from "../queries/company.queries.js";

export const registerCompany=async(req,res)=>{
    try{
        const {companyName}=req.body;

        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }

        const company=await getCompanyByName(companyName);

        if(company){
            return res.status(409).json({
                message:"Company already exist",
                success:false
            });
        }

        const result=await createCompany(companyName,req.id);
        const newCompany = await getCompanyById(result.insertId);

        return res.status(201).json({
            message: "Company registered successfully.",
            success: true,
            company: newCompany
        });

    }catch(error){
          console.log(error);

           return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

export const getAllCompaniesByUserId = async (req, res) => {
    try {
        const userId = req.id;

        const companies = await getCompaniesByUserId(userId);

        if(!companies){
            return res.status(404).json({
                message:"No company created by this id",
                success:false
            })
        }

        return res.status(200).json({
            success: true,
            companies
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

export const getCompanyByCompanyId=async(req,res)=>{
    try{
        const id=req.params.id;
        const company=await getCompanyById(id);

        if(!company){
            return res.status(404).json({
                message:"company not found by the id",
                success:false
            })
        }

        return res.status(200).json({
            company,
            success:true
        })

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

export const updateCompany=async(req,res)=>{
    try{
        const companyId=req.params.id;
         let company = await getCompanyById(companyId);


        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        const {companyName,description,website,location}=req.body;
        const file=req.file;
        //cloudinary

        const updatedCompanyName = companyName || company.companyName;
        const updatedDescription = description || company.description;
        const updatedWebsite = website || company.website;
        const updatedLocation = location || company.location;
        const updatedLogo = company.logo;

        await updateCompanyById(companyId,updatedCompanyName,updatedDescription,updatedWebsite,updatedLocation,updatedLogo);
        
        company = await getCompanyById(companyId);

        if(!company){
            return res.status(404).json({
                message:"company not fouund",
                success:false
            })
        }

           return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company
        });


    }catch(error){
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}