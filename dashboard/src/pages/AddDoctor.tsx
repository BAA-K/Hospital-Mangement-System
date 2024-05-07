import React, { useState } from 'react'
import { useAppContext } from '../context/AppCotext'
import { Button, Form } from "react-bootstrap";
import Logo from '/logo.png'
import docHolder from '/docHolder.jpg'
import { department } from '../misc/config';
import { useMutation } from 'react-query';
import { addNewDoctor } from '../api-client';


const AddDoctor = (): React.JSX.Element => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [nic, setNic] = useState<string>("")
    const [dob, setDob] = useState<Date>(new Date())
    const [gender, setGender] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [selectedDepartment, setDepartment] = useState<string>("")
    const [avatar, setAvatar] = useState<string>("")
    const [avatarPrev, setAvatarPrev] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { showToast } = useAppContext()
    const mutation = useMutation(addNewDoctor, {
        onSuccess: (res) => {
            showToast({ message: res.message, type: "SUCCESS" })
            resetValue()
            setIsLoading(false)
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);


            reader.onload = () => {
                if (typeof reader.result === "string")
                    setAvatar(reader.result);
                setAvatarPrev(file);
            };
        }
    };

    const handleSubmit = () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("nic", nic)
        formData.append("gender", gender)
        formData.append("password", password)
        formData.append("dob", dob.toISOString())
        formData.append("doctorDepartment", selectedDepartment)
        formData.append("docAvatar", avatarPrev as File)
        formData.append("role", "Doctor")
        mutation.mutate(formData)
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
        setDepartment("")
        setAvatar("")
        setAvatarPrev(null)
    }

    return (
        <div className="add-doctor">
            <img src={Logo} alt="lgo" className="d-block mx-auto" />
            <h1 className='text-center text-uppercase fw-bold fs-3 my-xl-4 mb-sm-2'>Register New Doctor</h1>
            <Form className='row g-3' onSubmit={e => {
                e.preventDefault()
                console.log(avatarPrev)
                handleSubmit(
                    // firstName,
                    // lastName,
                    // email,
                    // phone: +phone,
                    // nic: +nic,
                    // dob,
                    // gender,
                    // doctorDepartment: selectedDepartment,
                    // role: "Doctor",
                    // docAvatar: avatarPrev
                )
            }}>
                <div className="image-holder col-lg-4 col-12">
                    <img src={avatar ? avatar : docHolder} alt="avatar" className='avatar' />
                    <Form.Control type='file' accept='.jpg, .png, .webp, .jpeg' onChange={handleAvatar} />
                </div>
                <div className="info-holder col-lg-8 col-12">

                    <div className="mb-2">
                        <Form.Control type='text' placeholder='First Name' value={firstName} onChange={event => setFirstName(event.target.value)} />
                    </div>
                    <div className="mb-2">
                        <Form.Control type='text' placeholder='Last Name' value={lastName} onChange={event => setLastName(event.target.value)} />
                    </div>

                    <div className="mb-2">
                        <Form.Control type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className="mb-2">
                        <Form.Control type='number' placeholder='Mobile Number' value={phone} onChange={event => setPhone(event.target.value)} />
                    </div>

                    <div className="mb-2">
                        <Form.Control type='number' placeholder='Nic' value={nic} onChange={event => setNic(event.target.value)} />
                    </div>
                    <div className="mb-2">
                        <Form.Control type='date' placeholder='Date of Birth' value={dob.toISOString().split('T')[0]} onChange={event => setDob(new Date(event.target.value))} />
                    </div>

                    <div className="mb-2">
                        <Form.Select aria-label='Default Select Example' value={gender} onChange={e => setGender(e.target.value)}>
                            <option>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </div>
                    <div className="mb-2">
                        <Form.Select aria-label='Default Select Example' value={selectedDepartment} onChange={e => setDepartment(e.target.value)}>
                            <option>Department</option>
                            {department.map(i => (
                                <option value={i}>{i}</option>

                            ))}
                        </Form.Select>
                    </div>
                    <div className="mb-2">
                        <Form.Control type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                    </div>

                    <Button className='send-btn' disabled={isLoading} type='submit'>{isLoading ? "Wait A Second" : "Register New Doctor"}</Button>
                </div>
            </Form>
        </div >
    )
}

export default AddDoctor;