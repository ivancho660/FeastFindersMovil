import api from "./Conexion";

//funcion que me listara los restaurantes traidos de la base de datos
// esta funcion se usara en el componente ListarRestaurantes.js
export const ListarRestaurantes = async () => {
    try {
        const response = await api.get(`/listarRestaurantes`);
        return {success: true, data: response.data};
    }catch (error){
        console.error("error al listar los restaurantes:", error.response ? error.response.data : error.message);
        return {
            sucess: false,
            message: error.response ? error.response.data : "error de conexión"
        };
    }
};