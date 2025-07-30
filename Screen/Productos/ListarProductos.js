import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Image 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductosCard from "../../Components/productosCard";
import { ListarProductos } from "../../Src/Servicios/ProductosService";

export default function ListarProducto() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const { nombreRestaurante } = route.params || {};

  const CargarProductos = async () => {
    setLoading(true);
    try {
      const result = await ListarProductos(nombreRestaurante);
      if (result.success && result.data.productos?.length > 0) {
        setProductos(result.data.productos);
      } else {
        setProductos([]);
      }
    } catch (error) {
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", CargarProductos);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando Productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Listado de Productos</Text>

      {productos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png",
            }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No hay productos disponibles</Text>
        </View>
      ) : (
        <View style={styles.cuadrosContainer}>
          {productos.map((item) => (
            <ProductosCard
              key={item.id}
              producto={item}
              onPress={() =>
                navigation.navigate("DetalleProductos", { producto: item })
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    minHeight: "100%",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 16,
    textAlign: "center",
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
    backgroundColor: "#E3F2FD",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1976D2",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
    opacity: 0.8,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    fontWeight: "500",
  },
});
