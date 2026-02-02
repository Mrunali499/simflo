import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'simflo_auth_token';
const USER_ID_KEY = 'simflo_user_id';

export interface Session {
    token: string;
    userId: string;
}

export async function setSession(token: string, userId: string): Promise<void> {
    if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_ID_KEY, userId);
    } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        await SecureStore.setItemAsync(USER_ID_KEY, userId);
    }
}

export async function getSession(): Promise<Session | null> {
    let token, userId;

    if (Platform.OS === 'web') {
        token = localStorage.getItem(TOKEN_KEY);
        userId = localStorage.getItem(USER_ID_KEY);
    } else {
        token = await SecureStore.getItemAsync(TOKEN_KEY);
        userId = await SecureStore.getItemAsync(USER_ID_KEY);
    }

    if (token && userId) {
        return { token, userId };
    }
    return null;
}

export async function clearSession(): Promise<void> {
    if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
    } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_ID_KEY);
    }
}
