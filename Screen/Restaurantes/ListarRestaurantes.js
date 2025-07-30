import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RestauranteCardCuadro from "../../Components/RestauranteCardCuadro";
import { ListarRestaurantes as ObtenerRestaurantes } from "../../Src/Servicios/RestauranteService";

export default function ListarRestaurantesScreen() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarRestaurantes = async () => {
    setLoading(true);
    try {
      const result = await ObtenerRestaurantes();
      if (result.success) {
        setRestaurantes(result.data);
      } else {
        console.error("Error al listar restaurantes:", result.message);
      }
    } catch (error) {
      console.error("Error al obtener los restaurantes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarRestaurantes);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando Restaurantes...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Listar Restaurantes</Text>
      <View style={styles.cuadrosContainer}>
        {restaurantes.map((restaurante) => (
          <RestauranteCardCuadro
            key={restaurante.id}
            restaurante={restaurante}
            onPress={() =>
  navigation.navigate("productosStack", {
    screen: "ListarProductos",
    params: { nombreRestaurante: restaurante.nombre },
  })
}

          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cuadrosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
