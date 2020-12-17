import React, { useState } from "react";
import CarouselCatalogo from "../../components/general/cards/carousel";
import GrupoCartas from "../../components/general/cards/grupoCartas";
import Filtros from "../../components/general/cards/filtros";

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
