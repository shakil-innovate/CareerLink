import express from "express";

import {authenticateToken} from "../middleware/isAuthenticated.js";
import {getAdminJobs,  getAllJobs,  getJobById, 
      postJob,} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
// public - anyone can browse jobs without logging in
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);
router.route("/get/:id").get(getJobById);
export default router;