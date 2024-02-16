import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Tile from '../components/Tile';
import { HightscoreContext } from '../components/HighscoresContext';
import Button from '../components/Button';
import Sound from 'react-native-sound';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type SoundsPlayer = {
    green: Sound;
    red: Sound;
    yellow: Sound;
    blue: Sound;

}
const { width } = Dimensions.get('window');
Sound.setCategory('Playback');
export default function HomeScreen({ navigation }: Props) {
    const [colorList, setColorList] = useState<string[]>([])
    const [answer, setAnswer] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)
    const [gameLocked, setGameLocked] = useState<boolean>(true)
    const [focusedColor, setFocusedColor] = useState<string>('' as string)
    const [sounds, setSounds] = useState({} as SoundsPlayer)
    const context = useContext(HightscoreContext);

    useEffect(() => {
        showOrder()
    }, [colorList])

    useEffect(() => {
        initSounds()
    }, [])

    const startGame = () => {
        setScore(0)
        setColorList([getRandomColor()])
        setAnswer([])
        setGameLocked(false)
    }

    const initSounds = (): void => {
        let tmp = {} as SoundsPlayer;
        tmp.green = new Sound(require('../assets/sounds/green.mp3'), '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        })
        tmp.red = new Sound(require('../assets/sounds/red.mp3'), '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        })
        tmp.yellow = new Sound(require('../assets/sounds/yellow.mp3'), '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        })
        tmp.blue = new Sound(require('../assets/sounds/blue.mp3'), '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        })
        setSounds(tmp);
    }

    const pushColor = (): void => {
        const newColorList: string[] = [...colorList]
        newColorList.push(getRandomColor())
        setColorList(newColorList)
    }

    const showOrder = async (): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setGameLocked(true)
        for (let i = 0; i < colorList.length; i++) {
            await tilePressBehavior(colorList[i])
        }
        setGameLocked(false)
    }

    const playSound = (sound: string): void => {
        for (let key in sounds) {
            sounds[key as keyof SoundsPlayer].stop();
        }
        sounds[sound as keyof SoundsPlayer].play((success) => {
            if (!success) {
                Alert.alert('Error', 'Failed to play the sound');
            }
        })
    }

    const handleUserTilePress = async (color: string): Promise<void> => {
        let newAnswer: string[] = [...answer, color]
        if (colorList.slice(0, newAnswer.length).join('') !== newAnswer.join('')) {
            onLoose();
            return
        }
        setAnswer(newAnswer)
        if (newAnswer.length === colorList.length) {
            setScore(score + 1)
            pushColor()
            setAnswer([])
            showOrder()
        }
        await tilePressBehavior(color);
    }

    const tilePressBehavior = async (color: string): Promise<void> => {
        playSound(color)
        setFocusedColor(color)
        await new Promise((resolve) => setTimeout(resolve, 500))
        setFocusedColor('')
        await new Promise((resolve) => setTimeout(resolve, 250))
    }

    const onLoose = (): void => {
        setGameLocked(true);
        setScore(0)
        setAnswer([])
        if (context?.hightscores && (context?.hightscores.length == 0 || score > context?.hightscores[context?.hightscores.length - 1].score)) {
            navigation.navigate('Highscore', { score })
        } else {
            navigation.navigate('Highscore', {});
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginVertical: 30, paddingHorizontal: 10 }}>
                <Button text='Highscore >' onPress={() => navigation.navigate('Highscore', {})} />
            </View>
            <Text style={styles.score}>Score : {score}</Text>
            <View style={styles.tilesContainer}>
                <Tile
                    color='green'
                    onPress={handleUserTilePress}
                    sound='sound'
                    focused={focusedColor === 'green'}
                />
                <Tile
                    color='red'
                    onPress={handleUserTilePress}
                    sound='sound'
                    focused={focusedColor === 'red'}
                />
                <Tile
                    color='yellow'
                    onPress={handleUserTilePress}
                    sound='sound'
                    focused={focusedColor === 'yellow'}
                />
                <Tile
                    color='blue'
                    onPress={handleUserTilePress}
                    sound='sound'
                    focused={focusedColor === 'blue'}
                />
                {
                    gameLocked && <View style={styles.mask} />
                }
            </View>
            <Button text='Start New Game' onPress={startGame} />
        </SafeAreaView>
    )
}

const getRandomColor = (): string => {
    const colors: string[] = ['red', 'blue', 'green', 'yellow']
    const randomIndex: number = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222',
        paddingHorizontal: 100,
    },
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: (width - 20),
        height: (width - 20),
        borderRadius: 1000,
        overflow: 'hidden',
        gap: 15,
        marginVertical: 50
    },
    score: {
        color: 'white',
        fontSize: 40,
    },
    startBtn: {
        color: '#333',
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 20,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 100
    },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: width,
        zIndex: 1,
    }
})