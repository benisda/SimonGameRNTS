import { View, Text, StyleSheet, Modal, Alert, Pressable, Touchable, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getData, storeData } from '../utils/Utils';
import { HightscoreContext } from '../components/HighscoresContext';
import Button from '../components/Button';
import { Score } from '../components/HighscoresContext';
import { useFocusEffect } from '@react-navigation/native';
type Props = NativeStackScreenProps<RootStackParamList, 'Highscore'>;

export default function HighscoreScreen({ navigation, route }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('')
    const context = useContext(HightscoreContext);

    useEffect(() => {
        if (route.params.score) {
            setModalVisible(true);
        }
    }, [route.params.score])

    const renderHighscore = (item: Score, index: number) => {
        const ranksColors = ['#FFD700', '#C0C0C0', '#CD7F32', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF'];
        return (
            <View style={styles.score}>
                <Text style={styles.scoreText}>#{index + 1}</Text>
                <Text style={[styles.scoreText, { color: ranksColors[index] }]}>{item.name}</Text>
                <Text style={styles.scoreText}>{item.score}</Text>
            </View>
        )
    }
    const handleSave = () => {
        context?.saveHightscore({ name: name == '' ? 'Anonymous' : name, score: route.params.score ?? 0 });
        setModalVisible(false);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginVertical: 30, paddingHorizontal: 10 }}>
                <Button text='< New Game' onPress={navigation.goBack} />
            </View>
            <Text style={{ color: 'white', fontSize: 40 }}>Highscores:</Text>
            <View style={{ width: '100%', paddingHorizontal: 50, marginTop: 50 }}>
                <View style={{ borderColor: 'grey', borderBottomWidth: 1 }}>
                    <FlatList
                        data={context?.hightscores}
                        renderItem={({ item, index }) => renderHighscore(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Congrats, you scored {route.params.score}!</Text>
                        <Text>Enter your name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}></TextInput>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSave}
                        >
                            <Text style={styles.textStyle}>Save score</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    score: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    scoreText: {
        color: 'white',
        fontSize: 20
    }
})