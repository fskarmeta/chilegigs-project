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
      gigs: [],
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      autoLogin: (token) => {
        fetch(`${getStore().fetchUrl}user/autologin`, {
          method: "POST",
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
                cuenta: data.cuenta,
                token: data.access_token.replace("Bearer ", ""),
                role: data.cuenta.role.name,
                username: data.cuenta.username,
                user_id: data.cuenta.id,
                perfil: data.perfil,
                perfil_status: data.perfil.status,
                LoggedIn: true,
              });
              getActions().fetchAllUserGigs(
                data.access_token.replace("Bearer ", "")
              );
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      loginToTrue: () => {
        setStore({ LoggedIn: true });
      },
      dataFromLogin: (data) => {
        setStore({
          cuenta: data.cuenta,
          token: data.token_de_acceso,
          role: data.cuenta.role.name,
          username: data.cuenta.username,
          user_id: data.cuenta.id,
          // LoggedIn: true,
        });

        sessionStorage.setItem("chilegigs_token", data.token_de_acceso);

        if (data.cuenta.role.name === "dj") {
          getActions().fetchIndividualDjProfileAfterLogin(
            data.cuenta.id,
            data.token_de_acceso
          );
          getActions().fetchAllUserGigs(data.token_de_acceso);
        }
        if (data.cuenta.role.name === "client") {
          getActions().fetchIndividualClientProfileAfterLogin(
            data.cuenta.id,
            data.token_de_acceso
          );
          getActions().fetchAllUserGigs(data.token_de_acceso);
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
        sessionStorage.removeItem("chilegigs_token");
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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setStore({
              getDjCatalogo: data,
            });
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
      fetchAllUserGigs: (token) => {
        fetch(`${getStore().fetchUrl}account/gig`, {
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
            console.log(data);
            setStore({ gigs: data });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      deleteAccountFromAdmin: (id) => {
        fetch(`${getStore().fetchUrl}admin/accounts/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStore().token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
    },
  };
};

export default getState;
