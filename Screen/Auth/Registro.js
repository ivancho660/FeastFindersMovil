import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BottonComponent from "../../Components/BottomComponents";
import { registerUser } from "../../Src/Servicios/AuthService";

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
      const result = await registerUser(
        nombre,
        email,
        telefono,
        direccion,
        username,
        password,
        confirmarPassword
      );
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!", [
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo...");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Error al registrarse",
          result.message || "Ocurrió un error al registrarse"
        );
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      Alert.alert("Error", "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
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
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
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
            style={{ backgroundColor: "#ff8c42" }}
            title="Registrarse"
            onPress={handleRegister}
          />
          <BottonComponent
            style={{ backgroundColor: "#43A047" }}
            title="Iniciar Sesión"
            onPress={() => navigation.navigate("Login")}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60, // espacio para botón y teclado
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
});
