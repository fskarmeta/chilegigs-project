export const colorState = (string) => {
  switch (string) {
    case "Pendiente":
      return "info";
    case "Declinado":
    case "Cancelado":
      return "danger";
    case "Modificado por Cliente":
    case "Dj pide cambios":
      return "warning";
    case "Aceptado":
      return "primary";
    case "Confirmado":
      return "success";
    case "Terminado":
      return "dark";
    default:
      return "light";
  }
};
