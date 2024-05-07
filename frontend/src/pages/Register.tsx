import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { setAnimation, setAnimationScroll } from '../misc/animation'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { registerPatient } from '../api-client'
import { useAppContext } from '../context/AppContext'

export type patientData = {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    nic: number,
    dob: Date,
    gender: string,
    password: string,
    role: string
}

const Register = (): React.JSX.Element => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [mobileNumber, setMobileNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [nic, setNic] = useState<string>("")
    const [dob, setDob] = useState<Date>(new Date())
    const [gender, setGender] = useState<string>("")

    const { showToast } = useAppContext()

    const mutation = useMutation(registerPatient, {
        onSuccess: (res) => {
            showToast({ message: res.message, type: "SUCCESS" })
            resetValue()
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleSubmit = (data: patientData) => {
        mutation.mutate(data)
    }

    const resetValue = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setMobileNumber("")
        setPassword("")
        setNic("")
        setDob(new Date())
        setGender("")
    }

    useEffect(() => {
        const aniElement: HTMLElement[] = Array.from(document.querySelectorAll("*[data-ani]"));
        const endSection: HTMLElement | null = document.querySelector(".send-btn")
        const windowHeight: number = window.innerHeight;

        setAnimation(aniElement, endSection, windowHeight)

        setAnimationScroll(aniElement, endSection, windowHeight, .8)
        setAnimationScroll(aniElement, endSection, windowHeight, 9)
        window.addEventListener("scroll", () => setAnimationScroll(aniElement, endSection, windowHeight, .5))
    }, [])

    return (
        <div className="register text-black-50">
            <div className="header-form">
                <h3 className="title" data-ani="down">Sign Up</h3>
                <p data-ani="down">Please Sign Up To Continue</p>
                <p data-ani="down" className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, aut perspiciatis. Rerum, distinctio? Voluptatibus voluptas quia voluptate cumque, similique culpa. Laborum ab officia placeat reiciendis!</p>
            </div>
            <Form className='row g-3' onSubmit={e => {
                e.preventDefault()
                handleSubmit({
                    firstName,
                    lastName,
                    email,
                    phone: +mobileNumber,
                    nic: +nic,
                    dob,
                    gender,
                    password,
                    role: "Patient"
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
                    <Form.Select aria-label='Default Select Example' onChange={e => setGender(e.target.value)}>
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </div>
                <div data-ani="left" className='col-lg-6 col-12'>
                    <Form.Control type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                </div>

                <div className="col-12" data-ani="left">
                    <p className="text-end fs-6">Already Have An Account? <Link className='link' to={"/login"}>Login Now</Link></p>
                </div>

                <Button className='send-btn' data-ani="up" type='submit'>Register</Button>
            </Form>
        </div>
    )
}

export default Register