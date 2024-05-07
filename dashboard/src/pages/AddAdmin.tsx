import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Logo from '/logo.png'
import { useMutation } from "react-query";
import { addNewAdmin } from "../api-client";
import { useAppContext } from "../context/AppCotext";

export type Admin = {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    password: string,
    gender: string,
    dob: Date,
    nic: number,
    role: string
}

const AddAdmin = (): React.JSX.Element => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [nic, setNic] = useState<string>("")
    const [dob, setDob] = useState<Date>(new Date())
    const [gender, setGender] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { showToast } = useAppContext()

    const mutation = useMutation(addNewAdmin, {
        onSuccess: (res) => {
            showToast({ message: res.message, type: "SUCCESS" })
            resetValue()
        },
        onError(err: Error) {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleSubmit = (data: Admin) => {
        mutation.mutate(data)
    }

    const resetValue = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setNic("")
        setDob(new Date())
        setGender("")
        setPassword("")
    }

    return (
        <div className="new-admin">
            <img src={Logo} alt="lgo" className="d-block mx-auto" />
            <h1 className='text-center text-uppercase fw-bold fs-3 my-xl-4 mb-sm-2'>Add New Admin</h1>
            <Form className='row g-3' onSubmit={e => {
                e.preventDefault()
                handleSubmit({
                    firstName,
                    lastName,
                    email,
                    phone: +phone,
                    password,
                    gender,
                    dob,
                    nic: +nic,
                    role: "Admin"
                })
            }}>
                <div className="col-lg-6 col-12">
                    <Form.Control type='text' placeholder='First Name' value={firstName} onChange={event => setFirstName(event.target.value)} />
                </div>
                <div className="col-lg-6 col-12">
                    <Form.Control type='text' placeholder='Last Name' value={lastName} onChange={event => setLastName(event.target.value)} />
                </div>

                <div className="col-lg-6 col-12">
                    <Form.Control type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div className="col-lg-6 col-12">
                    <Form.Control type='number' placeholder='Mobile Number' value={phone} onChange={event => setPhone(event.target.value)} />
                </div>

                <div className="col-lg-6 col-12">
                    <Form.Control type='number' placeholder='Nic' value={nic} onChange={event => setNic(event.target.value)} />
                </div>
                <div className="col-lg-6 col-12">
                    <Form.Control type='date' placeholder='Date of Birth' value={dob.toISOString().split('T')[0]} onChange={event => setDob(new Date(event.target.value))} />
                </div>

                <div className="col-lg-6 col-12 ">
                    <Form.Select aria-label='Default Select Example' value={gender} onChange={e => setGender(e.target.value)}>
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </div>
                <div className="col-lg-6 col-12">
                    <Form.Control type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                </div>

                <Button className='send-btn' type='submit'>Add New Admin</Button>
            </Form>
        </div >
    )
}

export default AddAdmin;