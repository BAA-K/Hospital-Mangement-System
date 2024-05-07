import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Hero from "../components/Hero";
import aboutImage from "/images/about.png"
import Biography from "../components/Biography";
import { setAnimation, setAnimationScroll } from "../misc/animation";

const About = (): React.JSX.Element => {
    useEffect(() => {
        const aniElement: HTMLElement[] = Array.from(document.querySelectorAll("*[data-ani]"));
        const endSection: HTMLElement | null = document.querySelector("[data-end-bio]")
        const windowHeight: number = window.innerHeight;

        setAnimation(aniElement, endSection, windowHeight)
        setAnimationScroll(aniElement, endSection, windowHeight, 1)

        window.addEventListener("scroll", () => setAnimationScroll(aniElement, endSection, windowHeight, 1.2))
    }, [])

    return (
        <Container className="overflow-hidden">
            <Hero
                title={"Learn More About Us | ZeeCare Medical Institute"}
                img={aboutImage}
                measure={255}
            />
            <Biography />
        </Container>
    )
}

export default About