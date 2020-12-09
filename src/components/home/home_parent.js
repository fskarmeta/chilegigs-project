import React, { useState } from "react";
import { objetosGlobales } from "../../placeholder/objetoglobal";
import Home from '../../placeholder/homeobject'; 
import HeaderHome from "./HeaderHome";
import Caja from './Caja';
import Carrusel from './Carrusel';
import Footer from "./Footer";
//importar tus subcomponentes
//pasar comos props los objetos globales (objetos)

const HomeParent = () => {

const [home, setHome] = useState(Home);

  return <div style={{overflow: 'hidden'}}>
    <HeaderHome header={home.header}/>
    <Caja subheader={home.subheader}/>
    <Carrusel citas={home.citas}/>
    <Footer />
  </div>;
};

export default HomeParent;
