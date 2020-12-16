import React, { useState } from "react";
import CarouselCatalogo from "./carousel";
import GrupoCartas from "../../components/dj/cards/grupoCartas";
import Filtros from "./filtros";

const Catalogo = () => {
  return (
    <div>
      <Filtros />
      {/*<CarouselCatalogo />*/}
      <GrupoCartas />
    </div>
  );
};

export default Catalogo;
