import React, { useState } from "react";
// import { ejemploPerfil } from "../../../placeholder/ejemploperfil";
import Mix from "./components_perfil/mix";
import DjProfileCard from "./components_perfil/card";
import Bio from "./components_perfil/bio";
import GeneralEspectaculo from "./components_perfil/general_espectaculo";
import RequisitosDj from "./components_perfil/requisitos";
import DatosPersonales from "./components_perfil/datos";
import Fechas from "./components_perfil/fechas";
const DjPerfil = ({ fetchProfile }) => {
  const [perfil, setPerfil] = useState(fetchProfile);

  // para cuando tengamos gigs y queramos renderear los datos personales
  const [hasHired, setHasHired] = useState(true);
  //
  return (
    <>
      <div className="container">
        {perfil.agregar_cancion && perfil.agregar_cancion ? (
          <Mix mix={perfil.url_cancion} />
        ) : null}

        <div className="row">
          <div className="col-md-4">
            <DjProfileCard
              imagen={perfil.imagen}
              artista={perfil.artista}
              ciudad={perfil.ciudad}
              pais={perfil.pais}
              rating={perfil.suma_rating}
              contrataciones={perfil.contrataciones}
              tecnica={perfil.tecnica}
              generos={perfil.generos}
              instagram={perfil.instagram}
              soundcloud={perfil.soundcloud}
              mixcloud={perfil.mixcloud}
            />
            <span className="btn btn-dark w-100 mt-3">
              Agenda este DJ aquí !
            </span>
            <Fechas />
          </div>
          <div className="col-md-8">
            <Bio biografia={perfil.biografia} />
            <GeneralEspectaculo
              servicios={perfil.servicios}
              dur_min={perfil.dur_min}
              dur_max={perfil.dur_max}
              staff={perfil.staff}
              viajes={perfil.viajes}
              arriendo={perfil.arrienda_equipos}
            />
            <RequisitosDj
              equipos={!!perfil && perfil.requisitos.equipos}
              escenario={!!perfil && perfil.requisitos.escenario}
              foodanddrinks={!!perfil && perfil.requisitos.foodanddrinks}
            />
            <DatosPersonales
              nombre={perfil.datos.nombre}
              apellido={perfil.datos.apellido}
              nacionalidad={perfil.datos.nacionalidad}
              celular={perfil.datos.celular}
              rut={perfil.datos.rut}
              calle={perfil.datos.calle}
              numero={perfil.datos.numero}
              ciudad={perfil.datos.ciudad}
              region={perfil.datos.region}
              pais={perfil.datos.pais}
              hasHired={hasHired}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DjPerfil;
