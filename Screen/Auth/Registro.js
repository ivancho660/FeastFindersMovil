import { View, Text, TextInput, StyleSheet,Alert } from "react-native"
import BottonComponent from "../../Components/BottomComponents"
import react, { useState } from "react";
import { registerUser } from "../../Src/Servicios/AuthService"; // Asegúrate de que la ruta sea correcta

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async () => {
        setLoading(true);
        try {
            const result = await registerUser(nombre, email, telefono, direccion, username, password, confirmarPassword);
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
                    "Error al registrarse",
                    result.message || "Ocurrio un error al registrarse"
                );
            }
        } catch (error) {
            console.error("Error inesperado al registrarse:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar registrarse."
            );
        } finally {
            setLoading(false); //simepre desactiva el indecador de carga
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefono"
                value={telefono}
                onChangeText={setTelefono}
            />
                        <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
            />
                        <TextInput
                style={styles.input}
                placeholder="UserName"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
            />
            <BottonComponent
            style={{backgroundColor: "#ff8c42" }}
                title="Registrarse"
                onPress={handleRegister}
            />
            <BottonComponent
            style={{backgroundColor: "#43A047" }}
                title="Iniciar Sesión"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    )

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