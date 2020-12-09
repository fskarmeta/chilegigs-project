const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      objetosGlobales: [],
      perfil: {},
      cuenta: {},
      fetchUrl: "http://localhost:5000/",
      token: "",
      username: "",
      LoggedIn: false,
      role: "",
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
          LoggedIn: true,
        });
        localStorage.setItem("token", data.token_de_acceso);
      },
    },
  };
};

export default getState;
