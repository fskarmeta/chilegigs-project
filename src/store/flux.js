const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      home: {},
      requisitos: {},
      perfil: {},
      cuenta: {},
      fetchUrl: "http://localhost:5000/",
      token: "",
      username: "",
      LoggedIn: false,
      role: "",
      user_id: "",
      perfil_status: "",
      nav: [
        {
          label: "Home",
          to: "../home",
        },
        {
          label: "Dj's",
          to: "../catalogo",
        },
        {
          label: "Perfil",
          to: "../profile",
        },
        {
          label: "Editar Perfil Dj",
          to: "../dj/edit",
        },
        { label: "Editar Perfil Cliente", to: "../client/edit" },
        { label: "Gigs Dj", to: "../dj/gigs" },
        { label: "Gigs Cliente", to: "../client/gigs" },
        {
          label: "Cuenta",
          to: "../account",
        },
        {
          label: "Admin",
          to: "../admin",
        },
      ],
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      dataFromLogin: (data) => {
        setStore({
          cuenta: data.cuenta,
          token: data.token_de_acceso,
          role: data.cuenta.role.name,
          username: data.cuenta.username,
          user_id: data.cuenta.id,
          LoggedIn: true,
        });
        sessionStorage.setItem("token", data.token_de_acceso);

        if (data.cuenta.role.name === "dj") {
          getActions().fetchIndividualDjProfileAfterLogin(
            data.cuenta.id,
            data.token_de_acceso
          );
        }
        if (data.cuenta.role.name === "client") {
          getActions().fetchIndividualClientProfileAfterLogin(
            data.cuenta.id,
            data.token_de_acceso
          );
        }
      },
      logOut: () => {
        setStore({
          token: "",
          LoggedIn: false,
          role: "",
          cuenta: {},
          perfil: {},
          username: "",
          user_id: "",
          perfil_status: "",
        });
        sessionStorage.removeItem("token");
      },
      getGlobalObjects: () => {
        fetch(`${getStore().fetchUrl}objetos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStore({
              home: data.home,
              requisitos: data.requisitos,
            });

            return data;
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      fetchIndividualDjProfileAfterLogin: (id, token) => {
        fetch(`${getStore().fetchUrl}dj/profile/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.msg) {
              console.log(data.msg);
            } else {
              setStore({
                perfil: data,
                perfil_status: data.status,
              });
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      fetchIndividualClientProfileAfterLogin: (id, token) => {
        fetch(`${getStore().fetchUrl}client/profile/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.msg) {
              console.log(data.msg);
            } else {
              setStore({
                perfil: data,
                perfil_status: data.status,
              });
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      getDjCatalogo: (id, token) => {
        fetch(`${getStore().fetchUrl}profiles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setStore({
                    getDjCatalogo: data
                })
            });
    },
      updateProfile: (obj) => {
        // console.log(obj);
        fetch(`${getStore().fetchUrl}profile`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStore().token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.msg) {
              console.log(data.msg);
              if (getStore().role === "dj") {
                getActions().fetchIndividualDjProfileAfterLogin(
                  getStore().user_id,
                  getStore().token
                );
              }
              if (getStore().role === "client") {
                getActions().fetchIndividualClientProfileAfterLogin(
                  getStore().user_id,
                  getStore().token
                );
              }
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      
    },
  };
};

export default getState;

