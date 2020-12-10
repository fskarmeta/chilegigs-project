import React from 'react';
import '../../components/home/HeaderHome.css';

const HeaderHome = ({header}) => {

    let fondo = {
        backgroundImage: `url(${header.image})`,
        backgroundSize: 'cover',
        minHeight: '115vh'
    };

    return (
        <>
        <span>{header.cita}</span>
        
        <div className="container-fluid"
            style={fondo}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="btn">
                        <button type="button" className="boton">Ver catálogo de DJ's</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HeaderHome;