import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetalleDetalles from "../../../Screen/Detalles/DetalleDetalles";
import ListarDetalles from "../../../Screen/Detalles/ListarDetalles";


const Stack = createStackNavigator();

export default function DetallesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarDetalles"
                component={ListarDetalles}
                options={{ title: "Detalles" }}
            />
            <Stack.Screen
                name="DetalleDetalles"
                component={DetalleDetalles}
                options={{ title: "Detalle del Detalle" }}
            />
        </Stack.Navigator>
    )
}