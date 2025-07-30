import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetalleProductos from "../../../Screen/Productos/DetalleProductos";
import ListarProductos from "../../../Screen/Productos/ListarProductos";
import Carrito from "../../../Screen/Carrito/Carrito"; // Importa la pantalla del carrito

const Stack = createStackNavigator();

export default function ProductosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarProductos"
        component={ListarProductos}
        options={{ title: "Menú" }}
        initialParams={{ nombreRestaurante: "" }} // valor por defecto
      />
      <Stack.Screen
        name="DetalleProductos"
        component={DetalleProductos}
        options={{ title: "Detalle del Producto" }}
      />
      <Stack.Screen
        name="Carrito"
        component={Carrito}
        options={{ title: "Carrito de Compras" }}
      />
    </Stack.Navigator>
  );
}
