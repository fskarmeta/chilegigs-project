import React, { useState } from "react";
import Carousel from "./carousel";
import GrupoCartas from "../../components/dj/cards/grupoCartas"
import Footer from "../../components/home/Footer";

const Catalogo = () => {
  
    return (
      <div>
        <Carousel />
        <GrupoCartas />
        <Footer />
      </div>
    );
  };
  
  export default Catalogo;
