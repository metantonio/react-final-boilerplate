import { userStore, userActions } from "./user";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			...userStore
		},
		actions: {
			...userActions(getStore, getActions, setStore),
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			fetchGenerico: async (endpoint, data = undefined, metodo = "GET") => { //data y metodo son parámetros opcionales
				let BACKEND_URL = process.env.BACKEND_URL;
				let response = await fetch(BACKEND_URL + endpoint, {
					method: metodo,
					headers: { "Content-Type": "application/json" },
					body: data ? JSON.stringify(data) : undefined
				})
				//en este punto response es una promesa
				return response;
			},
			fetchProtegido: async (endpoint, data = undefined, metodo = "GET") => { //data y metodo son parámetros opcionales
				let BACKEND_URL = process.env.BACKEND_URL;
				const store = getStore(); //traerse el store
				let tokenStore = store.token;
				const tokenLocalStorage = localStorage.getItem("token")
				const tokenSessionStorage = sessionStorage.getItem("token")

				let response = await fetch(BACKEND_URL + endpoint, {
					method: metodo,
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + tokenStore
					},
					body: data ? JSON.stringify(data) : undefined
				})
				//en este punto response es una promesa
				return response;
			},


		}
	};
};

export default getState;
