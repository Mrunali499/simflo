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
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';

import { rootReducer } from 'simflo-backend/client';
import { createClientStore } from 'syncflo/client';
import '../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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

    const userId = '1';
    const store = useMemo(() => {
        if (!userId) return null;
        return createClientStore(rootReducer, {
            socket: {
                url: 'http://localhost:3001',
                auth: { token: userId }
            }
        });
    }, [userId]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <>  
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
        </>
    );
}
