import React from "react";
import { Message } from "../pages/ViewMessages";

const MessageCard = ({ item }: { item: Message }): React.JSX.Element => {
    return (
        <div className="card">
            <div className="card-body fw-bold text-black fs-6">
                <p>First Name: <span className="fw-normal">{item.firstName}</span></p>
                <p>Last Name: <span className="fw-normal">{item.lastName}</span></p>
                <p>Email: <span className="fw-normal">{item.email}</span></p>
                <p>Phone: <span className="fw-normal">{item.phone}</span></p>
                <p>Message: <span className="fw-normal">{item.message}</span></p>
            </div>
        </div>
    )
}

export default MessageCard