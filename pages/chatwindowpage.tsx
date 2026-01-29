import BoxIcon from '@/assets/images/box.svg';
import CalendarIcon from '@/assets/images/calendar_month.svg';
import HandshakeIcon from '@/assets/images/handshake.svg';
import TaxiIcon from '@/assets/images/local_taxi.svg';
import PersonIcon from '@/assets/images/person_icon.svg';
import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { VisitorType, VisitorTypeCard } from '@/components/core/VisitorTypeCard';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

const visitorTypes: VisitorType[] = [
    { id: 'guest', label: 'Guest', icon: PersonIcon },
    { id: 'helper', label: 'Helper', icon: HandshakeIcon },
    { id: 'delivery', label: 'Delivery', icon: BoxIcon },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'cab', label: 'Cab', icon: TaxiIcon },
];

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

    const handleVisitorTypePress = (typeId: string) => {
        console.log('Selected visitor type:', typeId);
        // Handle visitor type selection
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
                <View className="items-start pl-6 pb-4">
                    <VisitorTypeCard
                        visitorTypes={visitorTypes}
                        onTypePress={handleVisitorTypePress}
                    />
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
