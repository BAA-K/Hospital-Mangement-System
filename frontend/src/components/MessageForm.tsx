import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { sendMessage } from '../api-client'
import { useAppContext } from '../context/AppContext'

export type MessageType = {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    message: string
}

const MessageForm = (): React.JSX.Element => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [mobileNumber, setMobileNumber] = useState<number | string>("")
    const [message, setMessage] = useState<string>("")

    const { showToast } = useAppContext()

    const mutation = useMutation(sendMessage, {
        onSuccess: async (res) => {
            showToast({
                message: res.message, type: res.success === true ? "SUCCESS" : "ERROR"
            })
            restartValues();
        },
        onError: async (err: Error) => {
            showToast({
                message: err.message, type: "ERROR"
            })
        }
    })

    const handleMessageSend = async (data: MessageType) => {
        mutation.mutate(data)
    }

    const restartValues = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setMobileNumber("")
        setMessage("")
    }

    return (
        <div className="section form-sec">
            <h2 className="title" data-ani="up">Send Us A Message</h2>
            <Form className='row g-3' onSubmit={(e) => {
                e.preventDefault();
                handleMessageSend({ firstName, lastName, email, phone: +mobileNumber, message })
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
                    <Form.Control type='number' minLength={11} maxLength={11} placeholder='Mobile Number' value={mobileNumber} onChange={event => setMobileNumber(+event.target.value)} />
                </div>
                <div className="col-12 " data-ani="up-big">
                    <Form.Control type='text' minLength={10} rows={6} as="textarea" placeholder='Message' value={message} onChange={event => setMessage(event.target.value)} />
                </div>
                <Button className='send-btn' data-ani="up" type='submit'>Send</Button>
            </Form>
        </div >
    )
}

export default MessageForm