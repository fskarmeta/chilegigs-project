import React, { useState } from "react";
// import CarouselCatalogo from "../../components/general/cards/carousel";
import GrupoCartas from "../../components/general/cards/grupoCartas";
import Filtros from "../../components/general/cards/filtros";

const Catalogo = () => {
  const [electronica, setElectronica] = useState("");
  const [groovy, setGroovy] = useState("");
  const [comercial, setComercial] = useState("");
  const [tecnica, setTecnica] = useState("");
  const [servicio, setServicio] = useState("");

  function limpiar() {
    setElectronica("");
    setGroovy("");
    setComercial("");
    setTecnica("");
    setServicio("");
  }
  return (
    <div className="mb-5">
      <Filtros
        setElectronica={setElectronica}
        setGroovy={setGroovy}
        setComercial={setComercial}
        setTecnica={setTecnica}
        setServicio={setServicio}
        limpiar={limpiar}
      />
      {/*<CarouselCatalogo />*/}
      <GrupoCartas
        electronica={electronica}
        groovy={groovy}
        comercial={comercial}
        tecnica={tecnica}
        servicio={servicio}
      />
    </div>
  );
};

export default Catalogo;
