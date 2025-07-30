import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerOrdenPorSession } from "../../Src/Servicios/StripeService"; // Servicio que consulta la orden por session_id

export default function PagoExitoso() {
  const route = useRoute();
  const navigation = useNavigation();
  const { session_id } = route.params || {};
  
  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const res = await obtenerOrdenPorSession(session_id);
        if (res?.status === "success") {
          setOrden(res.orden);
        } else {
          Alert.alert("Error", res?.message || "No se encontró la orden");
        }
      } catch (e) {
        Alert.alert("Error", e.message || "Error al cargar orden");
      } finally {
        setLoading(false);
      }
    };

    if (session_id) fetchOrden();
  }, [session_id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text>Cargando datos del pago...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Pago Exitoso! 🎉</Text>
      {orden && (
        <>
          <Text style={styles.info}>Orden: {orden.numero}</Text>
          <Text style={styles.info}>Total: ${Number(orden.total || 0).toLocaleString("es-CO")}</Text>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#E3F2FD" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#2E7D32", marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10, color: "#333" },
  button: { marginTop: 20, padding: 15, backgroundColor: "#1976D2", borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
