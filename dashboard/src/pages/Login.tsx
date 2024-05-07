import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { setAnimationScroll, setAnimation } from '../misc/animation'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../context/AppCotext'
import { login } from '../api-client'
import Logo from '/logo.png'

export type loginData = {
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
}

const Login = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const { showToast } = useAppContext()
    const queryClient = useQueryClient()
    const navigationTo = useNavigate()

    const resetValue = () => {
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const mutation = useMutation(login, {
        onSuccess: async (res) => {
            showToast({ message: res.message, type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken")
            resetValue()
            navigationTo("/")
        },
        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" })
        }
    })

    const handleSubmit = (data: loginData) => {
        mutation.mutate(data)
    }

    useEffect(() => {
        const aniElement: HTMLElement[] = Array.from(document.querySelectorAll("*[data-ani]"));
        const endSection: HTMLElement | null = document.querySelector(".send-btn")
        const windowHeight: number = window.innerHeight;

        setAnimation(aniElement, endSection, windowHeight)

        setAnimationScroll(aniElement, endSection, windowHeight, .7)
        setAnimationScroll(aniElement, endSection, windowHeight, 1)
        window.addEventListener("scroll", () => setAnimationScroll(aniElement, endSection, windowHeight, .5))
    }, [])

    return (
        <div className="login container text-center text-black-50 overflow-hidden">
            <img data-ani="down" src={Logo} alt="lgo" />
            <h2 data-ani="down" className='title'>Welcome To Zeecare</h2>
            <p data-ani="down" className='paragraph'>Only Admin Are Allowed To Access This Resource</p>
            <Form className='form' onSubmit={e => {
                e.preventDefault()
                handleSubmit({
                    email,
                    password,
                    confirmPassword,
                    role: "Admin"
                })
            }}>
                <div data-ani="left">
                    <Form.Control type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div data-ani="right">
                    <Form.Control type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <div data-ani="left">
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                </div>

                <Button className='send-btn' data-ani="up" type='submit'>Login</Button>
            </Form>
        </div>
    )
}

export default Login