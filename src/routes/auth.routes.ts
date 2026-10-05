import { Router } from "express";
// import { register } from "../controllers/auth.controller";
import { forgotPassword, login, logout, register, resetPassword } from "../controllers/auth.controller";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/logout", logout);
export default router;