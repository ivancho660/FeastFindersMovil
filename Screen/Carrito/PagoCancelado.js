import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PagoCancelado() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pago Cancelado ❌</Text>
      <Text style={styles.message}>Tu transacción no fue completada. Puedes volver a intentarlo.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Carrito")}>
        <Text style={styles.buttonText}>Volver al Carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#FFEBEE" },
  title: { fontSize: 28, fontWeight: "bold", color: "#C62828", marginBottom: 20 },
  message: { fontSize: 18, textAlign: "center", color: "#333", marginBottom: 20 },
  button: { padding: 15, backgroundColor: "#D32F2F", borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
