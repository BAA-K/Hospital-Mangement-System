import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Department from "../components/Department"
import MessageForm from "../components/MessageForm"
import DoctorImage from "/images/hero.png"
import { setAnimation, setAnimationScroll } from "../misc/animation"

const Home = (): React.JSX.Element => {

    useEffect(() => {
        const aniElement: HTMLElement[] = Array.from(document.querySelectorAll("*[data-ani]"));
        const endSection: HTMLElement | null = document.querySelector(".send-btn")
        const windowHeight: number = window.innerHeight;
        
        setAnimation(aniElement,endSection,windowHeight)

        setAnimationScroll(aniElement, endSection, windowHeight, 1.5)

        window.addEventListener("scroll", () => setAnimationScroll(aniElement, endSection, windowHeight, 1.2))
    }, [])

    return (
        <Container className="overflow-hidden">
            <Hero title="Welcome To ZeeCare Medical Institute | Your Truster Healthcare Provider" measure={400} img={DoctorImage} />
            <Biography />
            <Department />
            <MessageForm />
        </Container>
    )
}

export default Home