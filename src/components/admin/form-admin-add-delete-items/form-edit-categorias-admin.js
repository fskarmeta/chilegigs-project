import React, { useEffect, useState } from "react";
import { SetCategory } from "./component-formulario/set-category";
import { SetItem } from "./component-formulario/set-item";
import { DeleteCategory } from "./component-formulario/delete-category";
import { DeleteItem } from "./component-formulario/delete-item.js";
import { CategoryTitle } from "./component-formulario/titulo-requisito";
import { SafeButton } from "./component-formulario/safe-button";

export const EditCategories = ({
  titulo,
  colorDeFondo,
  global,
  updateGlobalState,
  objectAttr,
}) => {
  /* Este objecto representa el array con todas las categorías e items que puede seleccionar el DJ para agregar items a su lista. 
    Por lo que es un select con opciones dentro de cada cateogria. */

  const [object, setObject] = useState(global);

  // recibir array desde el back

  const onlyCategories = [];

  // Creamos un array solo con las categorías en el formato requerido para usar react-select, estas la pasaremos al componente que
  // requiera hacer el display
  useEffect(() => {
    for (let element of object) {
      let newObj = { value: element.label, label: element.label };
      if (!onlyCategories.some((el) => el.value === newObj.value)) {
        onlyCategories.push(newObj);
      }
    }
  });

  function liftObjectForUpdate() {
    let objCopy = [...object];
    updateGlobalState(objectAttr, objCopy);
  }

  // Funcion que pasa al componente Set-Category y devuelve un objecto {label: NOMBRE_CATEGORIA options: [ARRAY VACIO]}
  // Hago copia del objecto original en el State
  //Chequea que la categoría no esté ya agregada, de ser así, retorna null
  //Agrega Objecto al array de Objetos (recordar que el array "options" ya viene inicializado pero vacío) y remplaza al array original
  function addCategory(obj) {
    let objectCopy = [...object];
    objectCopy.push(obj);
    setObject(objectCopy);
  }

  // Función para atrapar un item inidividual que se agrega al objeto, debe venir con la cateogría para saber donde meterlo.
  // atrabajo el item y la cateogoria
  //los inyecto a la función que agrega el item al objecto
  function getItemWithCategory(obj) {
    let createdItem = obj.item;
    let fromCategory = obj.category;
    addItemToObject(fromCategory, createdItem);
  }

  //función para agregar item a objeto con categoría
  //hago una copia del objecto original en el state
  // busco el indice de la cateogría donde tengo que meter el item
  //si el objeto ya incluye el value (es decir el item) no pasa nada.
  // de lo contrario, agregamos el item (con el formato requerido -vale,label, group-) al array de opciones de la categoría
  //finalmente mandamos el nuevo objeto para que remplaze el objeto antiguo del state
  function addItemToObject(category, item) {
    let objectCopy = [...object];
    for (let i in objectCopy) {
      if (objectCopy[i].label === category) {
        if (objectCopy[i].options.some((e) => e.value === item)) {
          return null;
        } else {
          objectCopy[i].options.push({
            value: item,
            label: item,
            group: category,
          });
        }
      }
    }
    setObject(objectCopy);
  }

  // Recibir categoría que se quiere borrar del componente delete y llamo la función para borrar
  function getCategory(str) {
    deleteCategory(str);
  }

  // Funcion para borrar categoría
  // Copio array original, veo si uno de los objetos tiene como label una categoría igual a la cateogría que estoy pasando
  //Recorto el objeto al que pertenece esa categoria
  // Actualizo el objecto original
  function deleteCategory(str) {
    let objectCopy = [...object];
    for (let i in objectCopy) {
      if (objectCopy[i].label === str) {
        objectCopy.splice(i, 1);
      }
    }
    setObject(objectCopy);
  }

  // función que recibe el item que será borrado (con la categoría porque será necesario)
  // copia del objeto original
  //busco en el objeto si algun label tiene el mismo nombre de la categoría que pasamos
  //de ser así busco dentro de la opciones de ese label si esta el item que hemos pasado
  //al cumplirse las condiciones tomo el indice de ese item en el array de opciones y lo recorto
  //remplazo el objeto original por el nuevo
  function getAndDeleteItem(categoria, item) {
    let objectCopy = [...object];
    for (let i in objectCopy) {
      if (objectCopy[i].label === categoria) {
        for (let j in objectCopy[i].options) {
          if (objectCopy[i].options[j].value === item) {
            objectCopy[i].options.splice(j, 1);
          }
        }
      }
    }
    setObject(objectCopy);
  }
  return (
    <div className="pb-2" style={{ backgroundColor: colorDeFondo }}>
      <CategoryTitle titulo={titulo} />
      <SetCategory addCategory={addCategory} onlyCategories={onlyCategories} />
      <SetItem
        onlyCategories={onlyCategories}
        getItemWithCategory={getItemWithCategory}
      />
      <DeleteCategory
        onlyCategories={onlyCategories}
        getCategory={getCategory}
      />
      <DeleteItem object={object} getAndDeleteItem={getAndDeleteItem} />
      <SafeButton liftObjectForUpdate={liftObjectForUpdate} />
    </div>
  );
};
