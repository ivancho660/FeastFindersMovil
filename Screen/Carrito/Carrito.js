import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  // Linking, // <-- Eliminado: Ya no lo usaremos para abrir la URL de Stripe
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import { VerCarrito, EliminarProductoCarrito } from "../../Src/Servicios/CarritoService";
import { iniciarCheckout } from "../../Src/Servicios/StripeService";
import * as WebBrowser from 'expo-web-browser'; // <-- Importación de WebBrowser
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Carrito() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  // <-- AGREGADO: warmUpAsync y coolDownAsync para WebBrowser
  useEffect(() => {
    WebBrowser.warmUpAsync(); // Pre-carga el navegador web para una apertura más rápida
    return () => {
      WebBrowser.coolDownAsync(); // Libera recursos cuando el componente se desmonta
    };
  }, []);
  // FIN AGREGADO -->

  const cargarCarrito = async () => {
    setLoading(true);
    const res = await VerCarrito();
    if (res.success) {
      setOrdenes(res.data.ordenes ?? []);
    } else {
      setOrdenes([]);
    }
    setLoading(false);
  };

  const eliminarDelCarrito = async (productoId) => {
    const res = await EliminarProductoCarrito(productoId);
    if (res.success) {
      await cargarCarrito();
    } else {
      alert(res.message || "No se pudo eliminar el producto");
    }
  };

 useFocusEffect(
  useCallback(() => {
    cargarCarrito();
  }, [])
);


  // --- Productos combinados ---
  const productosFusionados = useMemo(() => {
    return ordenes.flatMap((orden) =>
      (orden.detalle || [])
        .filter((p) => p && p.precio != null)
        .map((producto) => ({
          ...producto,
          restauranteNombre: orden.restaurante?.nombre || "Desconocido",
          total: producto.total || producto.precio * (producto.cantidad || 1),
        }))
    );
  }, [ordenes]);

  const nombresRestaurantes = useMemo(() => {
    const setNames = new Set(
      ordenes.map((o) => o.restaurante?.nombre).filter(Boolean)
    );
    return Array.from(setNames);
  }, [ordenes]);

  const totalGlobal = useMemo(() => {
    return ordenes.reduce((acc, o) => acc + (o.total || 0), 0);
  }, [ordenes]);

  const finalizarCompra = async () => {
    try {
      const cart = productosFusionados.map((p) => ({
        producto_id: p.producto_id,
        cantidad: p.cantidad,
        precio: p.precio,
      }));

      if (cart.length === 0) {
        Alert.alert("Carrito vacío", "Agrega productos antes de pagar.");
        return;
      }

      const res = await iniciarCheckout(cart);

      if (res?.url) {
        // *** CAMBIO CRÍTICO: Usar WebBrowser.openBrowserAsync ***
        const browserResult = await WebBrowser.openBrowserAsync(res.url);

        // Opcional: Para depuración, puedes ver qué devuelve WebBrowser
        console.log("Resultado de WebBrowser:", browserResult);

        // La navegación a PagoExitoso/PagoCancelado ahora debería ser
        // manejada por tu configuración de Linking en AppNavegacion.js
        // cuando WebBrowser cierra la ventana y tu app recibe el deep link.
        // No necesitas lógica de navegación explícita aquí a menos que
        // quieras forzar una recarga o navegar a una pantalla diferente
        // si el deep link no funciona por alguna razón.

      } else {
        Alert.alert("Error", res?.error || "No se pudo iniciar el pago.");
      }
    } catch (e) {
      // <-- Mejorado el log de errores
      console.error("Error en finalizarCompra:", e.message || e);
      Alert.alert("Error", e.message || "Error iniciando el pago");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text>Cargando carrito...</Text>
      </View>
    );
  }

  if (productosFusionados.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Carrito de Compras</Text>
        <View style={styles.emptyContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/11329/11329060.png",
            }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>¡Tu carrito está vacío!</Text>
          <Text style={styles.emptySubText}>Agrega productos para continuar.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrito de Compras</Text>

      <View style={styles.ordenContainer}>
        <Text style={styles.restaurantTitle}>
          Restaurantes: {nombresRestaurantes.join(" • ")}
        </Text>

        <FlatList
          data={productosFusionados}
          keyExtractor={(item, index) => `${item.producto_id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.product}>
                  {item.nombre} x {item.cantidad}
                </Text>
                <Text style={styles.restaurantTag}>{item.restauranteNombre}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.price}>
                  ${Number(item.total || 0).toLocaleString("es-CO")}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => eliminarDelCarrito(item.producto_id)}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <Text style={styles.total}>
                Total: ${Number(totalGlobal || 0).toLocaleString("es-CO")}
              </Text>
              <TouchableOpacity style={styles.button} onPress={finalizarCompra}>
                <Text style={styles.buttonText}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  ordenContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  restaurantTitle: { fontSize: 16, fontWeight: "bold", color: "#0D47A1", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    alignItems: "center",
  },
  product: { fontSize: 16 },
  restaurantTag: { fontSize: 12, color: "#666" },
  itemRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { fontSize: 16, fontWeight: "bold", color: "#1976D2", marginRight: 10 },
  deleteButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 20, alignItems: "center" },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  button: { backgroundColor: "#1976D2", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyImage: { width: 150, height: 150, marginBottom: 20 },
  emptyText: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 5 },
  emptySubText: { fontSize: 14, color: "#777" },
});