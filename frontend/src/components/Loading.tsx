import React from "react"
import { Spinner } from "react-bootstrap"

const Loading = (): React.JSX.Element => {
    return (
        <div className="loading">
            <Spinner animation="border" variant="info" />
        </div>
    )
}

export default Loading