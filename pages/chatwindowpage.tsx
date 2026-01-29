import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

export default function ChatWindowPage() {
    const [message, setMessage] = useState('');

    const handlePlusPress = () => {
        Alert.alert('Plus Button', 'Open attachment options');
    };

    const handleCameraPress = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
        } else if (result.errorCode) {
            console.log('ImagePicker Error: ', result.errorMessage);
            Alert.alert('Error', result.errorMessage || 'Something went wrong');
        } else if (result.assets && result.assets.length > 0) {
            const source = result.assets[0];
            console.log('Image captured: ', source.uri);
            // Handle the captured image (e.g., upload it or show it in the chat)
            Alert.alert('Camera', 'Photo captured successfully!');
        }
    };

    const handleMicPress = () => {
        Alert.alert('Microphone', 'Start voice recording');
    };

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title={'Visitors'} onBackPress={() => router.back()} />

            {/* Chat Content Area */}
            <View className="flex-1 items-center justify-center">
                <EmptyStateCard />
            </View>

            {/* Bottom Action Bar */}
            <BottomActionBar
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                onPlusPress={handlePlusPress}
                onCameraPress={handleCameraPress}
                onMicPress={handleMicPress}
            />
        </View >
    );
}
