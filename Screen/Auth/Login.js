import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import BottonComponent from "../../Components/BottomComponents";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService"; // Asegúrate de que la ruta sea correcta

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                Alert.alert("Éxito", "¡Bienvenido!", [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("Login exitoso, redirigiendo automaticamente...");
                        },
                    },
                ]);
            } else {
                Alert.alert(
                    "Error de login",
                    result.message || "Ocurrio un error al iniciar sesión"
                );
            }
        } catch (error) {
            console.error("Error inesperado en el login:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar iniciar sesión."
            );
        } finally {
            setLoading(false); //simepre desactiva el indecador de carga
        }
    };
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electronico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}

            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />
            <TouchableOpacity onPress={() => navigation.navigate("RecuperarContraseña")}>
                <Text style={styles.subtitle}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>



            <BottonComponent
                style={{ backgroundColor: "#ff8c42" }}
                title="Iniciar Sesión"
                onPress={handleLogin}
            />

            <BottonComponent
                title="¿no tienes cuenta? Registrate"
                onPress={() => navigation.navigate("Registro")}
                style={{ backgroundColor: "#43A047" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#1a1a1a", // var(--dark-color) simulada
    },

    title: {
        fontSize: 30,
        fontWeight: "400",
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#ff8c42",
        marginBottom: 20,
    },

    subtitle: {
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#ff8c42",
        marginBottom: 20,
    },

    input: {
        height: 50,
        borderRadius: 5,
        backgroundColor: "#cccccc",
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 15,
        color: "#000",
    },

    inputFocused: {
        borderWidth: 2,
        borderColor: "#f0e36f",
        backgroundColor: "#fff",
        shadowColor: "#f0e36f",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5, // para Android
    },

    button: {
        backgroundColor: "#ff8c42",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 17,
    },

    linkText: {
        color: "orange",
        fontWeight: "500",
        textDecorationLine: "none",
        textAlign: "center",
        marginTop: 10,
    },

    linkTextHover: {
        color: "darkorange",
        textDecorationLine: "underline",
    },
});
