const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      objetosGlobales: [],
      perfil: {},
      cuenta: {},
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
          label: "Cuenta",
          to: "../account",
        },
        {
          label: "Log In",
          to: "../login",
        },
      ],
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
    },
  };
};

export default getState;
