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
import { Alert, ScrollView, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

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

    const handleVisitorTypePress = (typeId: string) => {
        console.log('Selected visitor type:', typeId);
        // Handle visitor type selection
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
