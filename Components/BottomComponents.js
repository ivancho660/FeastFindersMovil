import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButtom({ title, onPress, style }) {
    return(
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.Text}>{title}</Text>

        </TouchableOpacity>
    )

    
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1976D2',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    Text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'},
});