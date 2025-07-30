import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import BottonComponent from "../../Components/BottomComponents";
import { restablecerPassword } from "../../Src/Servicios/AuthService";

export default function RestablecerPassword({ route, navigation }) {
  const { token_temporal } = route.params; // Recibe el token desde ValidarCodigo
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRestablecer = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Por favor ingresa y confirma la nueva contraseña.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const result = await restablecerPassword(token_temporal, password, confirmPassword);
    setLoading(false);

    if (result.success) {
      Alert.alert("Éxito", result.message || "Contraseña restablecida exitosamente.", [
        { text: "OK", onPress: () => navigation.navigate("Login") }
      ]);
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Text style={styles.subtitle}>Ingresa tu nueva contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <BottonComponent
        style={{ backgroundColor: "#ff8c42" }}
        title={loading ? "Enviando..." : "Restablecer"}
        onPress={handleRestablecer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ff8c42",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ff8c42",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#cccccc",
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#000",
  },
});
