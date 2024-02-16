import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

type Props = {
    color: string;
    sound: string;
    onPress: (color: string) => void;
    focused: boolean;
}


export default function Tile({ color, sound, onPress, focused }: Props) {
    const handlePress = (): void => {
        onPress(color)
    }
    return (
        <View style={{ opacity: focused ? 1 : 0.6 }}>
            <Pressable
                style={[styles.container, { backgroundColor: color }]}
                onPress={handlePress}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: (width - 20) / 2 - 10,
        height: (width - 20) / 2 - 10,
        borderRadius: 20,
    }
})