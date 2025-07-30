import api from "./Conexion";

export const ListarProductos = async (nr) => {
  try {
    const response = await api.get(`/menu/${encodeURIComponent(nr)}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al listar los productos:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error de conexión",
    };
  }
};
