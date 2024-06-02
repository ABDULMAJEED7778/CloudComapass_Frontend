import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('AsyncStorage error: ', error.message);
  }
};

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('AsyncStorage error: ', error.message);
  }
};
