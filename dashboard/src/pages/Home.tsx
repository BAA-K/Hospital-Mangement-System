import React, { useEffect, useState } from 'react';
import docAvatar from '/doc.png'
import { Form, Table } from 'react-bootstrap';
import { fetchAllAppointments, fetchAllDoctors, updateStatus } from '../api-client';
import { useAppContext } from '../context/AppCotext';
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { useMutation } from 'react-query';

type Doctors = {
    firstName: string,
    lastName: string
}

type Appoint = {
    _id: number,
    firstName: string,
    lastName: string,
    appointment_date: string,
    doctor: Doctors,
    hasVisited: boolean,
    department: string,
    status: string,
}

export type Status = "Accepted" | "Rejected" | "Pending"

const Home = (): React.JSX.Element => {
    const [doctors, setDoctors] = useState<Doctors[]>([]);
    const [appointments, setAppointments] = useState<Appoint[]>([]);

    const { admin, showToast } = useAppContext()

    const mutation = useMutation(updateStatus, {
        onSuccess: (res) => {
            showToast({ message: res.message, type: "SUCCESS" })
            fetchAppointments()
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const fetchDoctors = async () => {
        const data = await fetchAllDoctors()
        setDoctors(data.doctors)
    }

    const fetchAppointments = async () => {
        const data = await fetchAllAppointments()
        setAppointments(data.appointments)
    }

    const handleChangeStatus = (status: Status, id: number) => {
        mutation.mutate({ id, status })
    }

    useEffect(() => {
        fetchDoctors()
        fetchAppointments()
    }, [])

    return (
        <section className="main d-flex flex-column gap-4">
            <div className='banner'>
                <div className="card">
                    <div className="card-body">
                        <img src={docAvatar} alt="docImg" className='avatar' />
                        <div className="info">
                            <h2>Hello ,<span>{[admin.firstName, admin.lastName].join(" ")}</span></h2>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                                Assumenda repellendus necessitatibus itaque.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-white">
                    <div className="card-body">
                        <div>
                            <h4>Total Appointment</h4>
                            <h4 className='m-0'>{appointments && appointments.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="card bg-white">
                    <div className="card-body">
                        <div>
                            <h4>Registered Doctors</h4>
                            <h4 className='m-0'>{doctors && doctors.length}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner flex-grow-1">
                <div className="card bg-white h-100">
                    <div className="card-body">
                        <h3 className="card-title">Appointments</h3>
                        <div className="table-container">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th scope='col'>Patient</th>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Doctor</th>
                                        <th scope='col'>Department</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Visited</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments && appointments.map((item, index) => (
                                        <tr className='row-table' key={index}>
                                            <th>{item.firstName} {item.lastName}</th>
                                            <th>{item.appointment_date.split("T")[0]}</th>
                                            <th>{item.doctor.firstName} {item.doctor.lastName}</th>
                                            <th>{item.department}</th>
                                            <th>
                                                <Form.Select
                                                    value={item.status}
                                                    className={item.status === "Accepted" ? "text-success" : item.status === "Rejected" ? "text-danger" : "text-warning"}
                                                    onChange={(e) => handleChangeStatus(e.target.value as Status, item._id)}
                                                >
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Rejected">Rejected</option>
                                                </Form.Select>
                                            </th>
                                            <th className='icon-holder'>
                                                {item.hasVisited
                                                    ? (
                                                        <div className="icon bg-success text-white">
                                                            <IoMdCheckmark />
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="icon bg-danger text-white">
                                                            <FaXmark />
                                                        </div>
                                                    )}
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;