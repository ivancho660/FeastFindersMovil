import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetallesOrdenes from "../../../Screen/Ordenes/DetalleOrdenes";
import ListarOrdenes from "../../../Screen/Ordenes/ListarOrdenes";
import CrearOrden from "../../../Screen/Ordenes/EditarOrdenes";

const Stack = createStackNavigator();

export default function OrdenesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarOrdenes"
                component={ListarOrdenes}
                options={{ title: "Ordenes" }}
            />
            <Stack.Screen
                name="DetallesOrdenes"
                component={DetallesOrdenes}
                options={{ title: "Detalle de la Orden" }}
            />
            <Stack.Screen
                name="CrearOrden"
                component={CrearOrden}
                options={{ title: "Crear Orden" }}
            />
        </Stack.Navigator>
    )
}