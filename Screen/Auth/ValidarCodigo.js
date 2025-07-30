import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../Components/BottomComponents";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { validarCodigoRecuperacion } from "../../Src/Servicios/AuthService";

export default function ValidarCodigo({ route }) {
  const { email } = route.params;
  const [codigo, setCodigo] = useState("");
  const navigation = useNavigation();

  const handleValidar = async () => {
    if (!codigo) {
      Alert.alert("Error", "Por favor, ingresa el código.");
      return;
    }

    try {
      const result = await validarCodigoRecuperacion(email, codigo);
      console.log("Resultado validación:", result);

      if (result.success) {
        if (__DEV__) {
          // En desarrollo o con depurador, navega directo
          navigation.navigate("RestablecerPassword", {
            token_temporal: result.token_temporal,
            email,
          });
        } else {
          // En producción, muestra alerta con botón "Continuar"
          Alert.alert("Éxito", "Código validado correctamente.", [
            {
              text: "Continuar",
              onPress: () =>
                navigation.navigate("RestablecerPassword", {
                  token_temporal: result.token_temporal,
                  email,
                }),
            },
          ]);
        }
      } else {
        Alert.alert("Error", result.message || "Código inválido o expirado.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema validando el código.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validar Código</Text>
      <Text style={styles.subtitle}>Ingresa el código enviado a tu correo.</Text>

      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="default"
      />

      <BottonComponent
        style={{ backgroundColor: "#ff8c42" }}
        title="Validar Código"
        onPress={handleValidar}
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
