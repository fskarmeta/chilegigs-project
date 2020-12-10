import React, { useContext, useEffect } from 'react';
import { useState } from 'react';


const Card = (props) => {

    return (
        <>
            <div className="col-4">
                <div className="card" style={{ width: "16rem"}}>
                    <div className="d-flex justify-content-center">
                        <img src="https://www.6amgroup.com/wp-content/uploads/2018/03/nina_kraviz-1-teaser.jpg" className="card-img-top" style={{ height: "140px" }} alt="..." />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-center">Lucifer Dj </h5>
                        <h6 className="card-title d-flex justify-content-center"><i className="fas fa-map-marker-alt"> Antofagasta, Chile</i></h6>
                        <span className="card-title d-flex justify-content-center"><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i></span>
                        <div className="d-flex justify-content-between">
                            <p>Valoraciones</p>
                            <p>580</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Contrataciones</p>
                            <p>500</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Técnica</p>
                            <p>Análoga</p>
                        </div>
                        <span className="d-flex justify-content-center">
                            <p><i className="fab fa-mixcloud"></i> <i className="fab fa-instagram"></i></p>
                        </span>
                        <span className="d-flex justify-content-center">
                            <p>House, Acid, Tech</p>
                        </span>
                        <div className="d-flex justify-content-center">
                            <a href="#" className="btn btn-primary">Ver perfil</a>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
