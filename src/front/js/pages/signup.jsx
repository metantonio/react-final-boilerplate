import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const { store, actions } = useContext(Context);

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

    let response = await actions.fetchGenerico("/signup", obj, "POST"); //response es una promesa
    /* if (response.ok) {
      
    } else {
      
    } */
    response = await response.json(); //response es un objeto de Javascript
    console.log(response);
    alert(response.mensaje);
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
              Registrar
            </button>
          </div>
        </form>
        <Link to="/">Ir a Home</Link>
      </div>
    </>
  );
};
