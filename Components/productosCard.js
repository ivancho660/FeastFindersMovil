import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { useState } from "react";

export default function ProductosCard({ producto, onPress }) {
  const [cantidad, setCantidad] = useState("1"); // cantidad inicial

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {producto.imagen ? (
        <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sin imagen</Text>
        </View>
      )}

      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text style={styles.nombre}>{producto.descripcion}</Text>

      {/* <Text style={styles.precio}>${producto.precio}</Text> */}


      {/* Input de cantidad */}
      {/* <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={(text) => setCantidad(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor="#888"
      /> */}

      {/* Stock */}
      {/* <Text style={styles.stock}>Stock: {producto.cantidad}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  imagen: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholder: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#555",
    fontSize: 12,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
  },
  precio: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
    marginVertical: 4,
  },
  input: {
    width: 60,
    height: 40,
    borderColor: "#1976D2",
    borderWidth: 1,
    borderRadius: 6,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 2,
    marginBottom: 3,
  },
  stock: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
});
