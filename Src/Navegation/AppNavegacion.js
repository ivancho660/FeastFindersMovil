import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";
import * as Linking from "expo-linking";

export default function AppNavegacion() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);

    // Deep linking
    const prefix = Linking.createURL('/');
    const linking = {
        prefixes: [prefix, "miapp://"], // tu esquema definido en app.json
        config: {
            screens: {
                // Rutas principales
                NavegacionPrincipal: {
                    screens: {
                        Carrito: {
                            screens: {
                                PagoExitoso: "PagoExitoso",
                                PagoCancelado: "PagoCancelado",
                            },
                        },
                    },
                },
            },
        },
    };

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (e) {
            console.error("Error al cargar el token desde AsyncStorage:", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadToken(); // Carga inicial del token
    }, []);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log("App ha vuelto a estar activa, verificando el token...");
                loadToken(); // Recarga el token al volver a la app
            }
            appState.current = nextAppState;
        };
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const interval = setInterval(() => {
                if (AppState.currentState === 'active') {
                    loadToken(); // Recarga el token cada 2 segundos si la app está activa
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    return (
        <NavigationContainer linking={linking}>
            {userToken ? <NavegacionPrincipal /> : <AuthNavegacion />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
