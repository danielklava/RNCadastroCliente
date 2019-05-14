import AsyncStorage from '@react-native-community/async-storage'

export const deviceStorage = {
    async saveItem(key: string, value: any) {
        try {
            await AsyncStorage.setItem(key, value);
        }
        catch (error) {
            console.log('AsyncStorage error:' + error.message);
        }
    },
    async getItem(key: string) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        }
        catch (error) {
            console.log('AsyncStorage error:' + error.message);
        }
    },
    async removeItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        }
        catch (error) {
            console.log('AsyncStorage error:' + error.message);
        }
    }
}