import React, { useState, useContext, useEffect } from "react";
//bafian

import { Context } from "../../store/appContext";
//
// import { objetosGlobales } from "../../placeholder/objetoglobal";
import Home from "../../placeholder/homeobject";
import HeaderHome from "./HeaderHome";
import Caja from "./Caja";
import Carrusel from "./Carrusel";
import Footer from "./Footer";
import Spinner from "./spinner";
//importar tus subcomponentes
//pasar comos props los objetos globales (objetos)

const HomeParent = () => {
  const { store } = useContext(Context);
  const [isLoaded, setIsLoaded] = useState(false);
  const [home, setHome] = useState(Home);

  useEffect(() => {
    fetch(`${store.fetchUrl}objetos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHome(data.home);
        setIsLoaded(true);
        return data;
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoaded(true);
        setHome(Home);
      });
  }, [store.fetchUrl]);

  if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <div
        style={{
          overflow: "hidden",
          backgroundColor: `${home.subheader.color}`,
        }}
      >
        <HeaderHome header={home.header} />
        <Caja subheader={home.subheader} />
        <Carrusel citas={home.citas} />
        <Footer />
      </div>
    );
  }
};

export default HomeParent;
