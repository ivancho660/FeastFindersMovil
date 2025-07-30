import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../Components/BottomComponents";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { solicitarRecuperacion } from "../../Src/Servicios/AuthService";

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleEnviarCorreo = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
      return;
    }

    setLoading(true);
    const result = await solicitarRecuperacion(email.trim());
    setLoading(false);

    if (result.success) {
      // Opción A: navegar directo
      // navigation.navigate("ValidarCodigo", { email });

      // Opción B: mostrar alerta y luego navegar
      Alert.alert(
        "Éxito",
        result.message || "Se envió un correo para recuperar tu contraseña.",
        [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("ValidarCodigo", { email }),
          },
        ]
      );
    } else {
      Alert.alert("Error", result.message || "No se pudo enviar el correo de recuperación.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.subtitle}>
        Introduce tu correo electrónico para buscar tu cuenta.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <BottonComponent
        style={{ backgroundColor: "#ff8c42" }}
        title={loading ? "Enviando..." : "Enviar correo"}
        onPress={handleEnviarCorreo}
      />

      <BottonComponent
        style={{ backgroundColor: "#43A047" }}
        title="Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#1a1a1a" },
  title: { fontSize: 30, fontWeight: "400", textAlign: "center", color: "#ff8c42", marginBottom: 20 },
  subtitle: { fontSize: 15, fontWeight: "400", textAlign: "center", color: "#ff8c42", marginBottom: 20 },
  input: { height: 50, borderRadius: 5, backgroundColor: "#cccccc", paddingHorizontal: 16, marginBottom: 16, fontSize: 15, color: "#000" },
});
