import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { VisitorTypeCard } from '@/components/core/VisitorTypeCard';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function ChatWindowPage() {
    const [message, setMessage] = useState('');
    const [showVisitorTypeCard, setShowVisitorTypeCard] = useState(false);

    const handlePlusPress = () => {
        setShowVisitorTypeCard(!showVisitorTypeCard);
    };

    const handleCameraPress = () => {
        // Handle camera press
    };

    const handleMicPress = () => {
        // Handle mic press
    };

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title={'Visitors'} onBackPress={() => router.back()} />

            {/* Chat Content Area */}
            <View className="flex-1 items-center justify-center">
                {!showVisitorTypeCard && <EmptyStateCard />}
            </View>

            {/* Visitor Type Card - appears above BottomActionBar */}
            {showVisitorTypeCard && (
                <View className="items-center pb-4">
                    <VisitorTypeCard />
                </View>
            )}

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
