import express from "express";
import {
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getUserDetails,
    login,
    logoutAdmin,
    logoutPatient,
    patientRegister,
    verifyTokenPatient,
} from "../controller/userController.js";
import {
    isAdminAuthenticated,
    isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

router.post("/admin/addnew", addNewAdmin);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);

router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

router.post("/login", login);
router.get(
    "/validate-token-patient",
    isPatientAuthenticated,
    verifyTokenPatient
);

router.get("/doctors", getAllDoctors);

export default router;
