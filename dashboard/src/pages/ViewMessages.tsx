import React, { useEffect, useState } from 'react'
import { fetchMessages } from '../api-client'
import Card from '../components/MessageCard'

export type Message = {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    message: string
}

const ViewMessage = (): React.JSX.Element => {
    const [messages, setMessages] = useState<Message[]>([])

    const fetchAllMessages = async () => {
        const data = await fetchMessages()
        setMessages(data.messages)
    }

    useEffect(() => {
        fetchAllMessages()
    }, [])

    return (
        <div className="messages">
            <h1 className="fw-bold text-primary fs-3 text-uppercase">Messages</h1>
            {messages && messages.map((item, index) => (
                <Card key={index} item={item}/>
            ))}
        </div>
    )
}

export default ViewMessage