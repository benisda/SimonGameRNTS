import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error('Error storing data', e)
    }
}

export const getData = async (key: string): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.error('Error getting data', e)
        throw e
    }
}