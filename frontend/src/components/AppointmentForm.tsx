import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { department } from '../misc/config'
import { useMutation } from 'react-query'
import { fetchDoctors, getAppointment } from '../api-client'
import { useAppContext } from '../context/AppContext'

export type AppointmentType = {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    nic: number,
    dob: Date,
    appointment_date: Date,
    address: string,
    gender: string,
    department: string,
    doctor_firstName: string,
    doctor_lastName: string,
    hasVisited: boolean
}

export type doctorType = {
    _id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    nic: number,
    dob: Date,
    gender: string,
    doctorDepartment: string,
}

const AppointmentForm = (): React.JSX.Element => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [mobileNumber, setMobileNumber] = useState<string>("")
    const [nic, setNic] = useState<string>("")
    const [dob, setDob] = useState<Date>(new Date())
    const [appointmentDate, setAppointmentDate] = useState<Date>(new Date())
    const [address, setAddress] = useState<string>("")
    const [hasVisited, setHasVisited] = useState<boolean>(false)
    const [gender, setGender] = useState<string>("Male")
    const [doctorFirstName, setDoctorFirstName] = useState<string>("")
    const [doctorLastName, setDoctorLastName] = useState<string>("")
    const [doctors, setDoctors] = useState<doctorType[]>([])
    const [departmentSelected, setDepartmentSelected] = useState<string>("")

    const { showToast } = useAppContext()

    // const { data } = useQuery("fetchDoctors", fetchDoctors, { onError: () => { } })

    const mutation = useMutation(getAppointment, {
        onSuccess: async (res) => {
            resetValue()
            showToast({ message: res.message, type: "SUCCESS" })
        },
        onError: async (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleSubmit = (data: AppointmentType) => {
        mutation.mutate(data)
    }

    const resetValue = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setMobileNumber("")
        setNic("")
        setDob(new Date())
        setAppointmentDate(new Date())
        setAddress("")
        setHasVisited(false)
        setGender("")
        setDoctorFirstName("")
        setDoctorLastName("")
        setDepartmentSelected("")
    }

    const fetchAllDoctors = async () => {
        const data = await fetchDoctors()
        setDoctors(data.doctors)
    }

    useEffect(() => {
        fetchAllDoctors()
    }, [])

    return (
        <div className="section form-sec">
            <h2 className="text-black-50 fw-bold mb-3" data-ani="up">Appointment</h2>

            <Form className='row g-3' onSubmit={e => {
                e.preventDefault()
                handleSubmit({
                    firstName,
                    lastName,
                    phone: +mobileNumber,
                    nic: +nic,
                    email,
                    dob,
                    gender,
                    appointment_date: appointmentDate,
                    department: departmentSelected,
                    doctor_firstName: doctorFirstName,
                    doctor_lastName: doctorLastName,
                    hasVisited,
                    address
                })
            }}>
                <div className="col-lg-6 col-12" data-ani="right">
                    <Form.Control type='text' minLength={3} placeholder='First Name' value={firstName} onChange={event => setFirstName(event.target.value)} />
                </div>
                <div className="col-lg-6 col-12" data-ani="left">
                    <Form.Control type='text' minLength={3} placeholder='Last Name' value={lastName} onChange={event => setLastName(event.target.value)} />
                </div>

                <div className="col-lg-6 col-12" data-ani="right">
                    <Form.Control type='text' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div className="col-lg-6 col-12 " data-ani="left">
                    <Form.Control type='number' minLength={11} maxLength={11} placeholder='Mobile Number' value={mobileNumber} onChange={event => setMobileNumber(event.target.value)} />
                </div>

                <div className="col-lg-6 col-12 " data-ani="right">
                    <Form.Control type='number' minLength={13} maxLength={13} placeholder='Nic Number' value={nic} onChange={event => setNic(event.target.value)} />
                </div>
                <div className="col-lg-6 col-12 " data-ani="left">
                    <Form.Control type='date' placeholder='Date of Birth' value={dob.toISOString().split('T')[0]} onChange={event => setDob(new Date(event.target.value))} />
                </div>

                <div className="col-lg-6 col-12 " data-ani="right">
                    <Form.Select aria-label='Default Select Example' value={gender} onChange={e => setGender(e.target.value)}>
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </div>
                <div className="col-lg-6 col-12 " data-ani="left">
                    <Form.Control type='date' placeholder='Appointment Date' value={appointmentDate.toISOString().split('T')[0]} onChange={event => setAppointmentDate(new Date(event.target.value))} />
                </div>

                <div className="col-lg-6 col-12 " data-ani="right">
                    <Form.Select aria-label='Default Select Example' value={departmentSelected} onChange={e => setDepartmentSelected(e.target.value)}>
                        <option value={""}>Department</option>
                        {department.map((item, index) => (
                            <option key={index} className='text-capitalize' value={item}>{item}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col-lg-6 col-12" data-ani="left">
                    <Form.Select aria-label='Default Select Example' disabled={!departmentSelected} onChange={e => {
                        const [firstName, lastName] = e.target.value.split(" ")
                        setDoctorFirstName(firstName)
                        setDoctorLastName(lastName)
                    }}>
                        <option>Doctor</option>
                        {
                            doctors
                                .filter(doctor => doctor.doctorDepartment === departmentSelected)
                                .map((doctor, index) => (
                                    <option key={index} value={`${doctor.firstName} ${doctor.lastName}`}>{doctor.firstName} {doctor.lastName}</option>
                                ))
                        }
                    </Form.Select>
                </div>

                <div className="col-12">
                    <Form.Control type='text' placeholder='Address' value={address} onChange={event => setAddress(event.target.value)} data-ani="up" />
                </div>

                <div className='col-12' data-ani="left">
                    <Form.Check reverse className='text-black-50 fs-6' type='checkbox' label="Have You Visited Before?" defaultChecked={hasVisited} onChange={e => setHasVisited(e.target.checked)} />
                </div>

                <Button className='send-btn' data-ani="up" type='submit'>Get Appointment</Button>
            </Form>
        </div >
    )
}

export default AppointmentForm