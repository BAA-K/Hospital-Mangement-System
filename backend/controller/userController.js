import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role
    ) {
        return next(new ErrorHandler("Please Fill Full From!", 400));
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User Already Registered!", 400));
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    });

    res.status(200).json({
        success: true,
        message: "New User Registered!",
    });
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role)
        return next(new ErrorHandler("Please Provide All Details!", 400));

    
    if (password !== confirmPassword) {
        return next(
            new ErrorHandler("Password And Confirm Password Do Not Match!", 400)
        );
    }

    let user = await User.findOne({ email }).select("+password"); //! To contain The Password in Result

    if (!user) {
        return next(new ErrorHandler("Invalid Password Or Email", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched)
        return next(
            new ErrorHandler("Password Is Wrong!", 400)
        );

    if (role !== user.role)
        return next(new ErrorHandler("User With This Role Not Found!", 400));

    generateToken(user, "User Login Successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role
    ) {
        return next(new ErrorHandler("Please Fill Full From!", 400));
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered)
        return next(
            new ErrorHandler(
                `${isRegistered.role} With This Email Already Exists!`,
                400
            )
        );

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Admin",
    });

    res.status(200).json({
        success: true,
        message: "New Admin Registered!",
    });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });

    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "User Logged Out Successfully",
        });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "User Logged Out Successfully",
        });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/jpg",
    ];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        //! Media Type
        return next(new ErrorHandler("File Format Not Supported", 400));
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !doctorDepartment
    ) {
        return next(new ErrorHandler("Please Provide Full Details", 400));
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(
            new ErrorHandler(
                `${isRegistered.role} Already Registered With This Email`,
                400
            )
        );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Error"
        );
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});

export const verifyTokenPatient = async (req, res, next) => {
    res.status(200).send({ userId: req.user._id });
};
