import BoxIcon from '@/assets/images/box.svg';
import CalendarIcon from '@/assets/images/calendar_month.svg';
import HandshakeIcon from '@/assets/images/handshake.svg';
import TaxiIcon from '@/assets/images/local_taxi.svg';
import PersonIcon from '@/assets/images/person_icon.svg';
import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { SenderTextmsg } from '@/components/core/mysociety/SenderTextmsg';
import { Textmsg } from '@/components/core/mysociety/Textmsg';
import { VisitorType, VisitorTypeCard } from '@/components/core/VisitorTypeCard';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isSender: boolean;
}

const visitorTypes: VisitorType[] = [
    { id: 'guest', label: 'Guest', icon: PersonIcon },
    { id: 'helper', label: 'Helper', icon: HandshakeIcon },
    { id: 'delivery', label: 'Delivery', icon: BoxIcon },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'cab', label: 'Cab', icon: TaxiIcon },
];

export default function ChatWindowPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
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
        if (typeId === 'guest') {
            router.push('/addguest');
            setShowVisitorTypeCard(false);
        }
        // Handle other visitor types
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: message.trim(),
                timestamp: new Date(),
                isSender: true,
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title={'Visitors'} onBackPress={() => router.back()} />

            {/* Chat Content Area */}
            <View className="flex-1">
                {messages.length === 0 && !showVisitorTypeCard ? (
                    <View className="flex-1 items-center justify-center">
                        <EmptyStateCard />
                    </View>
                ) : (
                    <ScrollView
                        className="flex-1 px-4 pt-4"
                        contentContainerStyle={{ gap: 16 }}
                    >
                        {messages.map((msg) => (
                            msg.isSender ? (
                                <SenderTextmsg
                                    key={msg.id}
                                    message={msg.text}
                                    timestamp={msg.timestamp}
                                />
                            ) : (
                                <Textmsg
                                    key={msg.id}
                                    message={msg.text}
                                    timestamp={msg.timestamp}
                                />
                            )
                        ))}
                    </ScrollView>
                )}
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
                onSubmitEditing={handleSendMessage}
            />
        </View>
    );
}
