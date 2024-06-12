export const formatearCantidad = (cantidad) => {
  return Number(cantidad).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatearFecha = (fecha) => {
  const fechaNuevo = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechaNuevo.toLocaleString("es-ES", opciones);
};

export const generarID = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);

  return random + fecha;
};
