import React, { useState } from "react";
import { objetosGlobales } from "../../placeholder/objetoglobal";
//importar tus subcomponentes
//pasar comos props los objetos globales (objetos)

const HomeParent = () => {
  const [objetos, setObjetos] = useState(objetosGlobales);

  return <div className="container"></div>;
};

export default HomeParent;
