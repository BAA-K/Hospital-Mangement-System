import React from "react"
import bioImage from '/images/about.png';

const Biography = (): React.JSX.Element => {
    return (
        <div className="section biography row g-2">
            <div className="col-lg-6 col-12" data-ani='right'>
                <img src={bioImage} alt="Biography" className="img-fluid" />
            </div>
            <div className="col-lg-6 col-12" data-ani="left">
                <h3 className="title">Biography</h3>
                <h2 className="sub-title">Who We Are</h2>
                <div className="text-black-50">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                        blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
                        consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
                        ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex
                        magnam voluptatum consectetur reprehenderit fugiat recusandae aut
                        similique illum natus velit, praesentium nostrum nesciunt. Deleniti,
                        nesciunt laboriosam totam iusto!
                    </p>
                    <p>We are all in 2024!</p>
                    <p>We are working on a MERN STACK PROJECT.</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                        assumenda exercitationem accusamus sit repellendus quo optio dolorum
                        corporis corrupti. Quas similique vel minima veniam tenetur
                        obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
                        cupiditate natus provident. Ex illum quasi pariatur odit nisi
                        voluptas illo qui ipsum mollitia. Libero, assumenda?
                    </p>
                    <p>Lorem ipsum dolor sit amet!</p>
                    <p>Coding is fun!</p>
                </div>
            </div>
            <div data-end-bio></div>
        </div>
    )
}

export default Biography