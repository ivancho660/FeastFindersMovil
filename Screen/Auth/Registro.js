import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import BottomComponent from '../../Components/BottomComponents';

export default function RegistroScreen({navigation}){
    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmar, setConfirmar] = React.useState('');


    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#85c1e9'}}>
            <Text>Registrarse</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese su nombre completo"
                value={nombre}
                onChangeText={setNombre} 
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese telefono"
                value={telefono}
                maxLength={10}
                onChangeText={setTelefono}
                keyboardType="phone-pad"

            
            />
            <TextInput
                style={styles.input}
                placeholder="ingrese contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirme contraseña"
                value={confirmar}
                onChangeText={setConfirmar}
                secureTextEntry
            />
            <BottomComponent
            style={{backgroundColor: 'green'}}
            title="Registrarse"
            onPress={() => navigation.navigate("")}
            />
            <BottomComponent
            title="Ir a Login"
            onPress={() => navigation.navigate("Login")}
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