export const userStore = {
    user: {},
    userList: []
}

export function userActions(getStore, getActions, setStore) {
    return {
        logout: async () => {
            const store = getStore();
            let response = await getActions().fetchProtegido("/logout")
            setStore({ ...store, token: "" })
            localStorage.setItem("token", "")
            sessionStorage.setItem("token", "")

        },
        login: async (endpoint, data = null, metodo = "GET") => {
            const store = getStore();
            let BACKEND_URL = process.env.BACKEND_URL;
            let response = await fetch(BACKEND_URL + endpoint, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            //response = await response.json()
            let responseJson = await response.json()
            localStorage.setItem("token", responseJson.token)
            sessionStorage.setItem("token", responseJson.token)
            setStore({ ...store, token: responseJson.token })
            setStore({ ...store, email: responseJson.email })
            return response
        }
    }
}