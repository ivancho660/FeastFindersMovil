import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        return { success: true, token }
    } catch (error) {
        console.error(
            "Error login:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
};

export const LogoutUser = async () => {
try {
    await api.get('/cerrarSesion');
    await AsyncStorage.removeItem('userToken');
    return { success: true };
} catch (error) {
    console.error(
        "Error al cerrar sesión:",
        error.response ? error.response.data : error.message
    );
    return{
        success: false,
        message: error.response
            ? error.response.data.message
            : "Error al cerrar sesión",
    };
}
};

export const registerUser = async (nombre, email, telefono, direccion, username, password) => {
    try {
        const response = await api.post('/registrar', {
            nombre,
            email,
            telefono,
            direccion,
            username,
            password
        });
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error al registrar usuario:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
}