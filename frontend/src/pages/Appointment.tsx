import React, { useEffect } from "react"
import Hero from "../components/Hero"
import singInImage from "/images/signin.png"
import { Container } from "react-bootstrap"
import { setAnimation, setAnimationScroll } from "../misc/animation"
import AppointmentForm from "../components/AppointmentForm"

const Appointment = (): React.JSX.Element => {
    useEffect(() => {
        const aniElement: HTMLElement[] = Array.from(document.querySelectorAll("*[data-ani]"));
        const endSection: HTMLElement | null = document.querySelector(".send-btn")

        const windowHeight: number = window.innerHeight;

        setAnimation(aniElement,endSection,windowHeight)

        setAnimationScroll(aniElement, endSection, windowHeight, 1)

        window.addEventListener("scroll", () => setAnimationScroll(aniElement, endSection, windowHeight, 1))
    }, [])

    return (
        <Container className="overflow-hidden">
            <Hero title="Schedule your Appointment | ZeeCare Medical Institute" measure={215} img={singInImage} />
            <AppointmentForm />
        </Container>
    )
}

export default Appointment