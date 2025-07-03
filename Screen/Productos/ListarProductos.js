import { View, Text, StyleSheet, ScrollView } from "react-native";
import Cuadro from "../../Components/Cuadros";
import { useNavigation } from "@react-navigation/native";

export default function ListarProductos() {
    const navigation = useNavigation();

    const productos = [
  {
    id: 1,
    nombre: "El Sabor Criollo",
    imagen: { uri: "https://cdn-icons-png.flaticon.com/512/5787/5787079.png" },
  },
  {
    id: 2,
    nombre: "La Parrilla",
    imagen: { uri: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  },
  {
    id: 3,
    nombre: "Pizza House",
    imagen: { uri: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png" },
  },
  {
    id: 4,
    nombre: "Delicias del Mar",
    imagen: { uri: "https://cdn-icons-png.flaticon.com/512/3075/3075979.png" },
  },
];


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Listar de Productos</Text>
            <View style={styles.cuadrosContainer}>
                {productos.map(prod => (
                    <Cuadro
                        key={prod.id}
                        title={prod.nombre}
                        imagen={prod.imagen}
                        onPress={() => navigation.navigate("productosStack", { id: prod.id })}
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    cuadrosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});
