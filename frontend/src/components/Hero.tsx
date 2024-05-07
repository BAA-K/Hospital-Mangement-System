import React from "react";
import vectorImage from '/images/Vector.png'

interface Props {
    title: string,
    img: string,
    measure: number
}

const Hero = ({ title, img, measure }: Props): React.JSX.Element => {
    return (
        <div className="hero d-flex overflow-hidden">
            <div className="banner" data-ani="right">
                <h1 className="title">{title}</h1>
                <p className="subtitle text-black-50">   ZeeCare Medical Institute is a state-of-the-art facility dedicated
                    to providing comprehensive healthcare services with compassion and
                    expertise. Our team of skilled professionals is committed to
                    delivering personalized care tailored to each patient's needs. At
                    ZeeCare, we prioritize your well-being, ensuring a harmonious
                    journey towards optimal health and wellness.</p>
            </div>
            <div className="banner" data-ani="left">
                <img className="hero-image" style={{height: `${measure}px`}} src={img} alt="Hero" />
            </div>
            <span>
                <img src={vectorImage} alt="Vector" />
            </span>
        </div>
    )
}

export default Hero