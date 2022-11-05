import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const history = useNavigate();
  const [token, setToken] = useState("");
  const registrar = async (e) => {
    e.preventDefault();
    console.log("Entramos en la función de registrar");

    const data = new FormData(e.target);
    let email = data.get("email");
    let password = data.get("password");

    console.log(email, password);

    let obj = {
      email: email,
      password: password,
    };

    /*  let BACKEND_URL = process.env.BACKEND_URL;
    console.log(BACKEND_URL);

    let response = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
 */

    let response = await actions.login("/login", obj, "POST"); //response es una promesa
    console.log("36: ", response);
    if (response.status == 200) {
      //let respuestaJson = await response.json();
      //console.log("41: ", respuestaJson);
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: `Bienvenido, ${store.email}`,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudo iniciar sesión",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    //console.log(response);
    //response = await response.json(); //response es un objeto de Javascript
    console.table(response);
    //token = response.token;
    setToken(response.token);
    console.log("token", token);

    //alert(response.token);
  };

  const prueba = async () => {
    let response = await actions.fetchProtegido("/helloprotected");
    console.log(response);
    let responseJSON = await response.json();

    if (response.ok) {
      console.log(responseJSON);
      return history("/listaUsuarios");
    }
  };

  return (
    <>
      <div className="container">
        <form
          onSubmit={(evento) => {
            registrar(evento);
          }}
        >
          <div className="row d-flex">
            <div className="col mx-2">
              <div className="row">
                <h1>Email</h1>
              </div>
              <div className="row">
                <input
                  name="email"
                  placeholder="agregue su email"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="col mx-2">
              <div className="row">
                <h1>Password</h1>
              </div>
              <div className="row">
                <input
                  name="password"
                  placeholder="agregue su password"
                  type="string"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row d-flex py-2">
            <button className="btn btn-primary" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <Link to="/">Ir a Home</Link>
        {store.email ? (
          <button type="button" onClick={() => prueba()}>
            Endpoint protegida
          </button>
        ) : (
          <h1>No ha iniciado sesión</h1>
        )}
        {store.email ? (
          <button
            type="button"
            onClick={() => {
              actions.logout();
              history("/");
            }}
          >
            Cerrar Sesión
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
