import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import BottonComponent from "../../Components/BottomComponents";
import { useState } from "react";


export default function recuperar() {
      const [email, setEmail] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar contraseña</Text>
            <Text style={styles.subtitle}>	
                Introduce tu correo electrónico para buscar tu cuenta.</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electronico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"

            />

            <BottonComponent
                style={{ backgroundColor: "#ff8c42" }}
                title="Enviar correo"

            />

            <BottonComponent
                style={{ backgroundColor: "#43A047" }}
                title="Iniciar Sesión"

            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#1a1a1a", // var(--dark-color) simulada
    },

    title: {
        fontSize: 30,
        fontWeight: "400",
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#ff8c42",
        marginBottom: 20,
    },

    subtitle: {
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#ff8c42",
        marginBottom: 20,
    },

    input: {
        height: 50,
        borderRadius: 5,
        backgroundColor: "#cccccc",
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 15,
        color: "#000",
    },

    inputFocused: {
        borderWidth: 2,
        borderColor: "#f0e36f",
        backgroundColor: "#fff",
        shadowColor: "#f0e36f",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5, // para Android
    },

    button: {
        backgroundColor: "#ff8c42",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 17,
    },

    linkText: {
        color: "orange",
        fontWeight: "500",
        textDecorationLine: "none",
        textAlign: "center",
        marginTop: 10,
    },

    linkTextHover: {
        color: "darkorange",
        textDecorationLine: "underline",
    },
});