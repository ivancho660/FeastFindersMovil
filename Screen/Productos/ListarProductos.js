import {View, Text } from "react-native"

export default function ListarProductos(){
    const productos = [
    { id: 1, nombre: "El Sabor Criollo", icono: "restaurant" },
    { id: 2, nombre: "La Parrilla", icono: "local-dining" },
    { id: 3, nombre: "Pizza House", icono: "local-pizza" },
    { id: 4, nombre: "Delicias del Mar", icono: "set-meal" },
  ];
    return (
        
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>lista los productos</Text>
        </View>
    );
}