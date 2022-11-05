import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [single, setSingle] = useState({})
	// useEffect(()=>[] ,[])

	useEffect(() => {
		async function fetchData() {
			let user = await actions.fetchProtegido(`/user/${params.theid}`);
			console.log("user Single promesa:", user)
			if (user.status == 200) {
				user = await user.json();
				setSingle(user);
				console.log(user)
			} else {
				user = await user.json();
				console.log(user);
			}
		}
		fetchData();
	}, []);


	return (
		<div className="jumbotron">
			<h1 className="display-4">Correo del usuario: {single.email ? single.email : "No ha cargado aún"}</h1>
			<h1 className="display-4">ID del usuario: {single.id ? single.id : "No ha cargado aún"}</h1>
			<img src={rigoImageUrl} />
			<hr className="my-4" />

			<Link to="/listaUsuarios">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Regresar a Lista de Usuarios
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
