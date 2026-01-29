import BoxIcon from '@/assets/images/box.svg';
import CalendarIcon from '@/assets/images/calendar_month.svg';
import HandshakeIcon from '@/assets/images/handshake.svg';
import TaxiIcon from '@/assets/images/local_taxi.svg';
import PersonIcon from '@/assets/images/person_icon.svg';
import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { WebCameraOverlay } from '@/components/core/chatwindow/WebCameraOverlay';
import { SenderImagemsg } from '@/components/core/mysociety/SenderImagemsg';
import { SenderTextmsg } from '@/components/core/mysociety/SenderTextmsg';
import { Textmsg } from '@/components/core/mysociety/Textmsg';
import { VisitorType, VisitorTypeCard } from '@/components/core/VisitorTypeCard';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';

interface Message {
    id: string;
    text?: string;
    imageUri?: string;
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
    const [isWebCameraVisible, setIsWebCameraVisible] = useState(false);

    const handlePlusPress = () => {
        setShowVisitorTypeCard(!showVisitorTypeCard);
    };

    const handlePhotoCaptured = (uri: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            imageUri: uri,
            timestamp: new Date(),
            isSender: true,
        };
        setMessages([...messages, newMessage]);
        Alert.alert('Camera', 'Photo sent successfully!');
    };

    const handleCameraPress = async () => {
        if (Platform.OS === 'web') {
            setIsWebCameraVisible(true);
            return;
        }

        // Mobile Camera Logic (Expo Go)
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission Denied', 'You need to allow camera access to take photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handlePhotoCaptured(result.assets[0].uri);
        } else {
            console.log('User cancelled image picker');
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
                        {messages.map((msg) => {
                            if (msg.isSender) {
                                if (msg.imageUri) {
                                    return (
                                        <SenderImagemsg
                                            key={msg.id}
                                            imageUri={msg.imageUri}
                                            timestamp={msg.timestamp}
                                        />
                                    );
                                }
                                return (
                                    <SenderTextmsg
                                        key={msg.id}
                                        message={msg.text || ''}
                                        timestamp={msg.timestamp}
                                    />
                                );
                            } else {
                                return (
                                    <Textmsg
                                        key={msg.id}
                                        message={msg.text || ''}
                                        timestamp={msg.timestamp}
                                    />
                                );
                            }
                        })}
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

            {/* Live Web Camera View */}
            <WebCameraOverlay
                isVisible={isWebCameraVisible}
                onClose={() => setIsWebCameraVisible(false)}
                onCapture={handlePhotoCaptured}
            />
        </View>
    );
}
