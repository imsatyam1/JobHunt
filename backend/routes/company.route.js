import express from "express";
import isAutheticated from "../middleware/isAuthenticated.js";
import {getCompany, getCompanyById, registerCompany, updatedCompany} from "../controllers/company.controller.js";
import {upload} from "../middleware/mutler.js"

const router = express.Router();

router.route("/register").post(isAutheticated, registerCompany);
router.route("/get").get(isAutheticated, getCompany);
router.route("/get/:id").get(isAutheticated, getCompanyById);
router.route("/update/:id").put(isAutheticated,upload.single("file"), updatedCompany);

export default router;