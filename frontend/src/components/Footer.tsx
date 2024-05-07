import React from "react"
import { Container, Row } from "react-bootstrap"
import LogoImage from "/images/logo.png"
import { FaPhone, FaLocationArrow } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = (): React.JSX.Element => {
    const hours = [
        {
            id: 1,
            day: "Monday",
            time: "9:00 AM - 11:00 PM",
        },
        {
            id: 2,
            day: "Tuesday",
            time: "12:00 PM - 12:00 AM",
        },
        {
            id: 3,
            day: "Wednesday",
            time: "10:00 AM - 10:00 PM",
        },
        {
            id: 4,
            day: "Thursday",
            time: "9:00 AM - 9:00 PM",
        },
        {
            id: 5,
            day: "Monday",
            time: "3:00 PM - 9:00 PM",
        },
        {
            id: 6,
            day: "Saturday",
            time: "9:00 AM - 3:00 PM",
        },
    ];

    return (
        <Container className="section footer ">
            <Row className="g-3">
                <div className="col-lg-3 col-12">
                    <img src={LogoImage} alt="logo" className="img-fluid" />
                </div>
                <div className="q-link col-lg-2 col-12">
                    <ul className="p-0 text-black-50 fs-6">
                        <h5 className="text-dark fw-bold">Quick Links</h5>
                        <li className="mb-1"><Link to={"/"} >Home</Link></li>
                        <li className="mb-1"><Link to={'/appointment'} >Appointment</Link></li>
                        <li><Link to={"/about"} >About</Link></li>
                    </ul>
                </div>
                <div className="hours col-lg-5 col-12">
                    <ul className="p-0 text-black-50">
                        <h5 className="text-dark fw-bold">Hours</h5>
                        {hours.map(item => (
                            <li key={item.id}>
                                <span className="day">{item.day}</span>
                                <span className="time">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="contact col-lg-2 col-12">
                    <ul className="p-0 text-black-50 fs-6">
                        <h5 className="text-dark fw-bold">Quick Links</h5>
                        <li className="mb-1">
                            <FaPhone className="me-3 fs-5 text-dark" />
                            <span>999-999-9999</span>
                        </li>
                        <li className="mb-1">
                            <MdEmail className="me-3 fs-5 text-dark" />
                            <span>zeelab@gmail.com</span>
                        </li>
                        <li>
                            <FaLocationArrow className="me-3 fs-5 text-dark" />
                            <span>Karachi, Pakistan</span>
                        </li>
                    </ul>
                </div>
            </Row>
        </Container>
    )
}

export default Footer