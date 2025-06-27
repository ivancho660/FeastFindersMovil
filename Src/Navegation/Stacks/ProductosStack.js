import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetalleProductos from "../../../Screen/Productos/DetalleProductos";
import ListarProductos from "../../../Screen/Productos/ListarProductos";

const stack = createStackNavigator();

export default function ProductosStack(){
    return(
        <stack.Navigator>
            <stack.Screen
                name="ListarProductos"
                component={ListarProductos}
                options={{ title: "Menú" }}
            />
            <stack.Screen
                name="DetalleProductos"
                component={DetalleProductos}
                options={{ title: "Detalle del Producto" }}
            />
        </stack.Navigator>
    )
}