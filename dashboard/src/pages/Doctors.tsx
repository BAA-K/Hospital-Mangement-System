import React, { useEffect, useState } from "react";
import { fetchAllDoctors } from "../api-client";
import Card from "../components/DoctorCard";

export type Doctor = {
    _id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    dob: string,
    doctorDepartment: string,
    nic: number,
    gender: "Male" | "Female",
    role: "Doctor",
    docAvatar: {
        url: string
    }
}

const DoctorsView = (): React.JSX.Element => {
    const [doctors, setDoctors] = useState<Doctor[]>([])

    const fetchDoctors = async () => {
        const data = await fetchAllDoctors()
        setDoctors(data.doctors)
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    return (
        <section className="doctors">
            <h1 className="title fw-bold text-primary text-uppercase fs-3">Doctors</h1>
            <div className="doctors-holder d-flex flex-wrap gap-2">
                {doctors && doctors.map((doctor, index) => (
                    <Card key={index} item={doctor} />
                ))}
            </div>
        </section>
    )
}

export default DoctorsView;