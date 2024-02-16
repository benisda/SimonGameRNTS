import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    text: string;
    onPress: () => void;
}

export default function Button({ text, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        color: '#333',
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 20,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 100
    }
})