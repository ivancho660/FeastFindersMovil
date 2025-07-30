import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';

import RestaurantesStack from "./Stacks/RestaurantesStack";
import PerfilStack from "./Stacks/PerfilStack";
import ConfiguracionStack from "./Stacks/ConfiguracionStack";
import CarritoStack from "./Stacks/CarritoStack";


const Tab = createBottomTabNavigator();

export default function () {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#1976D2',// Color para el icono activo
                tabBarInactiveTintColor: '#757575',// Color para el icono inactivo
                tabBarStyle: { backgroundColor: '#fff', },// Estilo del fondo de la barra de pestañas
            }}>
            <Tab.Screen
                name="inicio"
                component={RestaurantesStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color="black" />)
                }} />

            <Tab.Screen

                name="Carrito"
                component={CarritoStack} // Tu stack o componente del carrito
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="shopping-cart" size={24} color={color} />
                    ),
                    tabBarBadge: 3, // 🔴 Muestra un número (ejemplo: 3 productos)
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilStack}
                options={{
                    headerShown: false, // 👈 Oculta el encabezado de este nivel
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Configuracion"
                component={ConfiguracionStack}
                options={{
                    headerShown: false, // 👈 Oculta el encabezado de este nivel
                    tabBarIcon: ({ color, size }) => (
                        <EvilIcons name="gear" size={24} color="black" />
                    ),
                }} />
        </Tab.Navigator>


    )
}