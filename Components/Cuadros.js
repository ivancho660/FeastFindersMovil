import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Cuadro({ title, onPress, iconName, imagen, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View style={styles.content}>
                {imagen ? (
                    <Image source={imagen} style={styles.imagen} />
                ) : (
                    <MaterialIcons name={iconName} size={48} color="#007bff" />
                )}
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 155,
        height: 180,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    content: {
        alignItems: "center",
    },
    text: {
        marginTop: 10,
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    imagen: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: "cover",
        marginBottom: 8,
    },
});
