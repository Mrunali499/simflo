import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

export default function ChatWindowPage() {
    const [message, setMessage] = useState('');

    const handlePlusPress = () => {
        Alert.alert('Plus Button', 'Open attachment options');
    };

    const handleCameraPress = () => {
        Alert.alert('Camera', 'Open camera');
    };

    const handleMicPress = () => {
        Alert.alert('Microphone', 'Start voice recording');
    };

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title={'Visitors'} />

            {/* Chat Content Area */}
            <ScrollView className="flex-1">
                <View className="mt-[333px]">
                    <EmptyStateCard />
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <BottomActionBar
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                onPlusPress={handlePlusPress}
                onCameraPress={handleCameraPress}
                onMicPress={handleMicPress}
            />
        </View>
    );
}
