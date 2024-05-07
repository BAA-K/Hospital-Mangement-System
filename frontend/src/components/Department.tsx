import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar, Navigation } from "swiper/modules";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import DepartmentSec from "./DepartmentSec";

import ped from "/images/departments/ped.jfif"
import orth from "/images/departments/ortho.jpg"
import card from "/images/departments/cardio.jpg"
import neu from "/images/departments/neuro.jpg"
import onc from "/images/departments/onco.jpg"
import rad from "/images/departments/radio.jpg"
import phy from "/images/departments/phy.jfif"
import der from "/images/departments/tep.jfif"
import int from "/images/departments/ent.jpg"

const Department = (): React.JSX.Element => {
    const departmentsArray = [
        {
            name: "Pediatrics",
            imageUrl: ped,
        },
        {
            name: "Orthopedics",
            imageUrl: orth,
        },
        {
            name: "Cardiology",
            imageUrl: card,
        },
        {
            name: "Neurology",
            imageUrl: neu,
        },
        {
            name: "Oncology",
            imageUrl: onc,
        },
        {
            name: "Radiology",
            imageUrl: rad,
        },
        {
            name: "Physical Therapy",
            imageUrl: phy,
        },
        {
            name: "Dermatology",
            imageUrl: der,
        },
        {
            name: "ENT",
            imageUrl: int,
        },
    ];

    return (
        <div className="section department" data-ani="up">
            <h2 className="text-black-50 fw-bold">Department</h2>
            <Swiper
                modules={[Autoplay, Scrollbar, Navigation]}
                autoplay={{ delay: 10000 }}
                slidesPerView={1}
                loop
                scrollbar={{ draggable: true }}
                navigation
                breakpoints={
                    {
                        768: {
                            spaceBetween: 50,
                            slidesPerView: 2
                        },
                        1200: {
                            spaceBetween: 50,
                            slidesPerView: 4
                        }
                    }
                }
            >
                {departmentsArray.map((item, index) => (
                    <SwiperSlide key={index}>
                        <DepartmentSec imgURI={item.imageUrl} name={item.name} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    )
}

export default Department