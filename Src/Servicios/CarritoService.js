import api from "./Conexion";

// Importante si usas sesión en Laravel (session()): 
// api.defaults.withCredentials = true;

export const AgregarProductoCarrito = async ({ id, cantidad }) => {
  try {
    const response = await api.post("/carrito/agregar", { id, cantidad });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al agregar al carrito:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error de conexión",
    };
  }
};

export const VerCarrito = async () => {
  try {
    const response = await api.get("/carrito/ver");
    return { success: true, data: response.data }; // { ordenes: [...] }
  } catch (error) {
    console.error(
      "Error al ver el carrito:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error de conexión",
    };
  }
};


export const EliminarProductoCarrito = async (idProducto) => {
  try {
    const response = await api.delete(`/carrito/eliminar/${idProducto}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al eliminar del carrito:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error de conexión",
    };
  }
};

export const ResumenCarrito = async () => {
  try {
    const response = await api.get("/carrito/resumen");
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al obtener el resumen:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error de conexión",
    };
  }
};
