import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'cart_items';

export const saveCartToStorage = async (cart: any[]) => {
    try {
        const jsonValue = JSON.stringify(cart);
        await AsyncStorage.setItem(CART_KEY, jsonValue);
    } catch (error) {
        console.error('Error saving cart:', error);
    }
};

export const getCartFromStorage = async (): Promise<any[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(CART_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error loading cart:', error);
        return [];
    }
};

export const clearCartFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(CART_KEY);
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
};
