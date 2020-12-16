import React, { useState } from "react";
import CarouselCatalogo from "./carousel";
import GrupoCartas from "../../components/dj/cards/grupoCartas"
import Footer from "../../components/home/Footer";
import Filtros from "./filtros";


const Catalogo = () => {
  
    return (
      <div>
        <Filtros />
        {/*<CarouselCatalogo />*/}
        <GrupoCartas />
        <Footer />
      </div>
    );
  };
  
  export default Catalogo;
