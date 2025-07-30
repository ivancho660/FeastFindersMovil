// Screen/Productos/DetalleProductos.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AgregarProductoCarrito } from "../../Src/Servicios/CarritoService"; // ajusta el path si cambia
import { useNavigation } from "@react-navigation/native";


export default function DetalleProductos() {
  const route = useRoute();
  const { producto } = route.params || {};
  const navigation = useNavigation();
  const [cantidad, setCantidad] = useState("1");

  // Imagen temporal para visualizar
  const imagenTemporal = "https://via.placeholder.com/400x250.png?text=Producto+Demo";

  if (!producto) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          No se encontró la información del producto.
        </Text>
      </View>
    );
  }

  const stock = producto.cantidad ?? 0;

  const onPlus = () => {
    const next = Math.min(Number(cantidad || 0) + 1, stock);
    setCantidad(String(next));
  };

  const onMinus = () => {
    const next = Math.max(Number(cantidad || 1) - 1, 1);
    setCantidad(String(next));
  };

  const onChangeCantidad = (t) => {
    const onlyNum = t.replace(/[^0-9]/g, "");
    const num = Number(onlyNum || 0);
    setCantidad(String(num > stock ? stock : num));
  };

  const precioFmt = (n) => {
    try {
      return n?.toLocaleString("es-CO");
    } catch {
      return n;
    }
  };

  const agregarAlCarrito = async () => {
  const num = Number(cantidad || 0);

  if (num <= 0) {
    return Alert.alert("Cantidad inválida", "Selecciona al menos 1 unidad.");
  }
  if (num > stock) {
    return Alert.alert("Stock insuficiente", "No hay suficiente stock.");
  }

  const payload = { id: producto.id, cantidad: num };

  const res = await AgregarProductoCarrito(payload);

if (res.success) {
  Alert.alert(
    "Carrito",
    `${num} x ${producto.nombre} agregado(s) al carrito.`,
    [
       { 
      text: "Ir al carrito", 
      onPress: () => navigation.navigate("Carrito", { screen: "carrito" }) 
    },
      { text: "Seguir comprando" },
    ]
  );
} else {
  Alert.alert("Error", res.message);
}
  };




  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen temporal */}
      <Image source={{ uri: imagenTemporal }} style={styles.imagen} />

      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        {!!producto.descripcion && (
          <Text style={styles.descripcion}>{producto.descripcion}</Text>
        )}
        <Text style={styles.precio}>${precioFmt(producto.precio)}</Text>
        <Text style={styles.stock}>Stock disponible: {stock}</Text>

        <View style={styles.qtyWrapper}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onMinus}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.qtyInput}
            value={cantidad}
            onChangeText={onChangeCantidad}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.qtyBtn} onPress={onPlus}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={agregarAlCarrito}>
          <Text style={styles.btnText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  imagen: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  precio: {
    fontSize: 20,
    color: "#2e7d32",
    fontWeight: "bold",
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  qtyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  qtyBtn: {
    width: 45,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#ff8c42",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  qtyInput: {
    width: 80,
    height: 45,
    marginHorizontal: 10,
    borderWidth: 1.5,
    borderColor: "#ff8c42",
    borderRadius: 8,
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#43A047",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: "100%",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
