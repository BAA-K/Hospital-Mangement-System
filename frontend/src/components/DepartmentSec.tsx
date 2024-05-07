import React from "react";
import { Card } from "react-bootstrap";

interface Props {
    imgURI: string,
    name: string
}

const DepartmentSec = ({ imgURI, name }: Props): React.JSX.Element => {
    return (
        <Card className="position-relative">
            <Card.Img src={imgURI} alt="department" className="card-image" />
            <Card.ImgOverlay>
                <span className="position-absolute badge bg-light rounded-pill text-dark fs-5">{name.toUpperCase()}</span>
            </Card.ImgOverlay>
        </Card>
    )
}

export default DepartmentSec