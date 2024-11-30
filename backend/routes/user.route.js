import express from "express";
import { forgotPassword, login, logout, register, updateProfile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/mutler.js";

const router = express.Router();

router.route("/register").post(upload.single("file"), register);
router.route("/forgot-password").post(forgotPassword);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout)
router.route("/profile/update").post(isAuthenticated, upload.fields([
    {name: 'profilePhoto', maxCount: 1},
    {name: 'file', maxCount: 1}
]), updateProfile);

export default router;  