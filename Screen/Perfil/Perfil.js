import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../Components/BottomComponents";
import api from "../../Src/Servicios/Conexion";
import { LogoutUser } from "../../Src/Servicios/AuthService";

export default function Perfil({ navigation }) {
  const [usuarios, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No se encontró el token.");
          return;
        }

        const response = await api.get("/traerDatos");
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);

        if (error.isAuthError || error.shouldRedirectTologin) return;

        if (error.response) {
          Alert.alert(
            "Error del servidor",
            `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
            [{ text: "Ok", onPress: async () => await AsyncStorage.removeItem("userToken") }]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor. Verifica tu conexión a internet.",
            [{ text: "Ok", onPress: async () => await AsyncStorage.removeItem("userToken") }]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [{ text: "Ok", onPress: async () => await AsyncStorage.removeItem("userToken") }]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff8c42" />
      </View>
    );
  }

  if (!usuarios) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.errorText}>
            No se pudo cargar el perfil del usuario.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.ContainerPerfil}>
        <Text style={styles.profileText}>
          Nombre: {usuarios.user?.nombre || "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          Email: {usuarios.user?.email || "No disponible"}
        </Text>

        <BottonComponent
          style={{ backgroundColor: "#ff8c42", marginBottom: 10 }}
          title="Editar perfil"
          onPress={() => {}}
        />
        <BottonComponent
          style={{ backgroundColor: "#43A047" }}
          title="Cerrar Sesión"
          onPress={async () => {
            await LogoutUser();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: "Roboto",
    textAlign: "center",
    color: "#ff8c42",
    marginBottom: 20,
  },
  ContainerPerfil: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#f0e36f",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  profileText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: "#ff4d4d",
    textAlign: "center",
    marginBottom: 20,
  },
});
