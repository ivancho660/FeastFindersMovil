// Components/RestauranteCardCuadro.js
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function RestauranteCardCuadro({ restaurante, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {restaurante.imagen ? (
        <Image source={{ uri: restaurante.imagen }} style={styles.imagen} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sin imagen</Text>
        </View>
      )}
      <Text style={styles.nombre}>{restaurante.nombre}</Text>
      <Text style={styles.tipo}>{restaurante.Horario || "Restaurante"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
  },
  tipo: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
  calificacion: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
});
