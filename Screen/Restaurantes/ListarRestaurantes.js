import { Text, ScrollView, View, StyleSheet } from "react-native";
import Cuadro from "../../Components/Cuadros";

export default function ListarRestaurantes({navigation}) {
  // Datos simulados
  const restaurantes = [
    { id: 1, nombre: "El Sabor Criollo", icono: "restaurant" },
    { id: 2, nombre: "La Parrilla", icono: "local-dining" },
    { id: 3, nombre: "Pizza House", icono: "local-pizza" },
    { id: 4, nombre: "Delicias del Mar", icono: "set-meal" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Listar Restaurantes</Text>
      <View style={styles.cuadrosContainer}>
        {restaurantes.map((restaurante) => (
          <Cuadro
            key={restaurante.id}
            title={restaurante.nombre}
            iconName={restaurante.icono}
            onPress={() =>  navigation.navigate("productosStack")}
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
});
