import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export const VistaImagenes = () => {
  const { store, actions } = useContext(Context);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    async function cargaImagenes() {
      let response = await actions.fetchGenerico("/lista-imagenes");
      response = await response.json();
      console.log(response.lista);
      setImagenes(response.lista);
    }

    cargaImagenes();
  }, []);

  return (
    <>
      <h1>test</h1>
      {imagenes.length > 0 ? (
        imagenes.map((item, index) => {
          return <img key={index} src={item.ruta}></img>;
        })
      ) : (
        <></>
      )}
    </>
  );
};
