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


/** 🔐 Recuperación de contraseña */
export const solicitarRecuperacion = async (email) => {
  try {
    const { data } = await api.post("/recuperacion/solicitar", { email });
    return {
      success: true,
      message: data?.message || "Solicitud enviada correctamente.",
      data,
    };
  } catch (error) {
    console.error(
      "Error en solicitarRecuperacion:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "No se pudo procesar la solicitud de recuperación.",
      status: error.response?.status,
      data: error.response?.data,
    };
  }
};

export const validarCodigoRecuperacion = async (email, codigo) => {
  try {
    const response = await api.post("/recuperacion/validar-codigo", {
      email,
      codigo,
    });
    return { success: true, ...response.data };
  } catch (error) {
    console.error("Error validando código:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error validando código",
    };
  }
};

export const restablecerPassword = async (token_temporal, password, password_confirmation) => {
  try {
    const response = await api.post("/recuperacion/restablecer", {
      token_temporal,
      password,
      password_confirmation
    });

    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response
        ? error.response.data.message || "Error al restablecer la contraseña"
        : "Error al conectar con el servidor"
    };
  }
};
