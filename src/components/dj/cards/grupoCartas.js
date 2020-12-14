import React, { useContext, useRef } from 'react';
import { Context } from '../../../store/appContext';
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom';
import { useState } from 'react';


const GrupoCartas = props => {
    const { store } = useContext(Context);
    let nombre = useRef(null); 

    
    return (
        <>
            <div className="container mt-4">
                <h1 className="charac mb-3">Nuestros Dj's</h1>
                <div className="card-deck">
                    <div className="row d-flex flex-row flex-nowrap overflow-auto">
                        {
                            !!store.profile &&
                            store.profile.map((dj, index) => {
                                const urlTest = dj.url.replace("http://localhost:3001/profiles", "");                                
                                return (
                                 <div className="card" style={{ width: "16rem" }} key={index}>
                                 <div className="d-flex justify-content-center">
                                     <img src="https://www.6amgroup.com/wp-content/uploads/2018/03/nina_kraviz-1-teaser.jpg" className="card-img-top" style={{ height: "140px" }} alt="..." />
                                 </div>
     
                                 <div className="card-body">
                                     <h5 className="card-title d-flex justify-content-center" key={nombre}>{dj.artista}</h5>
                                     <h6 className="card-title d-flex justify-content-center"><i className="fas fa-map-marker-alt">{dj.ciudad}</i></h6>
                                     {/* <ReactStars  value={artista.suma_rating / artista.contrataciones}/>*/}
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
                                         <p>{dj.tecnica}</p>
                                     </div>
                                     <span className="d-flex justify-content-center">
                                         <p><i className="fab fa-mixcloud"></i> <i className="fab fa-instagram"></i>{dj.instagram}</p>
                                     </span>
                                     <span className="d-flex justify-content-center">
                                          <p>{dj.generos}</p>
                                     </span>
                                     <div className="d-flex justify-content-center">
                                         <a href="#" className="btn btn-primary">Ver perfil</a>
     
                                     </div>
     
                                 </div>
                             </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default GrupoCartas;