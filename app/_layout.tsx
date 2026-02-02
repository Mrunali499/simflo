import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    useFonts,
} from '@expo-google-fonts/inter';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';

import { rootReducer } from 'simflo-backend/client';
import { createClientStore } from 'syncflo/client';
import '../global.css';

import { clearSession, getSession, setSession as saveSession } from '../lib/auth';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface AuthContextType {
    signIn: (token: string, userId: string) => Promise<void>;
    signOut: () => Promise<void>;
    user: string | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(user: string | null) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {

        if (!user && segments[0] !== 'index') {
            // Redirect to the login page if not signed in
           // router.replace('/');
        } else if (user && segments[0] === 'index') {
            // Redirect to the conversation page if already signed in
             router.replace('/conversation');
        }
    }, [user, segments]);
}

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    const [user, setUser] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                setUser(session.userId);
            }
            setIsAuthLoading(false);
        });
    }, []);

    useProtectedRoute(user);

    const authContext = useMemo(() => ({
        signIn: async (token: string, userId: string) => {
            await saveSession(token, userId);
            setUser(userId);
        },
        signOut: async () => {
            await clearSession();
            setUser(null);
        },
        user,
        isLoading: isAuthLoading
    }), [user, isAuthLoading]);

    const store = useMemo(() => {
        // Create store even if user is null to prevent hook violation or crashes, 
        // but it won't be connected effectively without a valid token.
        // Or we can return null and render a loading state if strict.
        // For now, let's pass null token if not logged in.
        return createClientStore(rootReducer, {
            socket: {
                url: 'http://localhost:3001',
                auth: { token: user || '' } 
            }
        });
    }, [user]);

    useEffect(() => {
        if (fontsLoaded && !isAuthLoading) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, isAuthLoading]);

    if (!fontsLoaded || isAuthLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Provider store={store}>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="chatwindow" options={{ headerShown: false }} />
                    <Stack.Screen name="conversation" options={{ headerShown: false }} />
                    <Stack.Screen name="addguest" options={{ headerShown: false }} />
                    <Stack.Screen name="patientchatwindow" options={{ headerShown: false }} />
                </Stack>
                <PortalHost />
            </Provider>
        </AuthContext.Provider>
    );
}
