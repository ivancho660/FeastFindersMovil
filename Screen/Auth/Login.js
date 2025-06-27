import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import BottomComponent from '../../Components/BottomComponents';

export default function LoginScreen( {navigation}){
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="ingrese correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="ingrese contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <BottomComponent
            style={{backgroundColor: 'green'}}
            title="Ingresar"
            onPress={() => navigation.navigate("")}
            />
            <BottomComponent
            title="Ir a registro"
            onPress={() => navigation.navigate("Registro")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
       
    },
});
