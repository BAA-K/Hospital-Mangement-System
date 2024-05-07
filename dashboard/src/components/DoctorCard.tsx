import React from "react";
import { Doctor } from "../pages/Doctors";

const DoctorCard = ({ item }: { item: Doctor }): React.JSX.Element => {
    return (
        <div className="card bg-white">
            <div className="card-body">
                <img src={item.docAvatar.url} alt="doctor" className="avatar" />
                <h4 className="text-black text-center my-3">{item.firstName}  {item.lastName}</h4>
                <p className="text-black fw-bold fs-6">Email: <span className="fw-normal">{item.email}</span></p>
                <p className="text-black fw-bold fs-6">Phone: <span className="fw-normal">{item.phone}</span></p>
                <p className="text-black fw-bold fs-6">DOB: <span className="fw-normal">{item.dob.split("T")[0]}</span></p>
                <p className="text-black fw-bold fs-6">Department: <span className="fw-normal">{item.doctorDepartment}</span></p>
                <p className="text-black fw-bold fs-6">Gender: <span className="fw-normal">{item.gender}</span></p>
            </div>
        </div>
    )
}

export default DoctorCard