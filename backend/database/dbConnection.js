import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("Connected To DB"))
        .catch((err) =>
            console.log("Some Error Occurred While Connecting To DB", err)
        );
};
