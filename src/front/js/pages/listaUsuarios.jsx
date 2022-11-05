import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ListaUsuarios = () => {
  const { store, actions } = useContext(Context);
  const [lista, setLista] = useState([]);

  //useEffect con arreglo vacío, se ejecuta la primera que carga el componente
  useEffect(() => {
    async function fetchData() {
      let users = await actions.fetchProtegido("/lista-usuarios");
      if (users.ok) {
        users = await users.json();
        setLista(users.lista);
      } else {
        users = await users.json();
        console.log(users);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      console.log("Salimos del COmpoenente lista de usuarios");
    };
  }, []);

  return (
    <>
      <h1>Lista de Usuarios</h1>
      {lista.length > 0 && lista ? (
        lista.map((item, index) => {
          return (
            <li key={index}>
              <Link to={`/single/${item.id}`}>
                Email del usuario: {item.email}, id: {item.id}
              </Link>
            </li>
          );
        })
      ) : (
        <h1>No hay información de usuarios disponible</h1>
      )}
      <Link to="/">Ir a Home</Link>
    </>
  );
};
