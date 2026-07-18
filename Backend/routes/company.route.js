import express from "express";

import { authenticateToken } from "../middleware/isAuthenticated.js";
import { getAllCompaniesByUserId,updateCompany,registerCompany,getCompanyByCompanyId } from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";
const router=express.Router();

router.route("/register").post(authenticateToken,registerCompany);
router.route("/get").get(authenticateToken,getAllCompaniesByUserId);
router.route("/get/:id").get(authenticateToken,getCompanyByCompanyId);
router.route("/update/:id").put(authenticateToken, singleUpload, updateCompany);

export default router;