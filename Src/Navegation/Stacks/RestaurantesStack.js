import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarRestaurantes from "../../../Screen/Restaurantes/ListarRestaurantes";
import ProductosStack from './ProductosStack';


const Stack = createStackNavigator();

export default function RestaurantesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarRestaurantes"
                component={ListarRestaurantes}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="productosStack" component={ProductosStack} options={{
                    headerShown: false, // 👈 Oculta el encabezado de este nivel
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={24} color="black" />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}