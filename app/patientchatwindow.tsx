import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { SenderTextmsg } from '@/components/core/mysociety/SenderTextmsg';
import { Textmsg } from '@/components/core/mysociety/Textmsg';
import { PatientDetailsCard } from '@/components/core/patient/PatientDetailsCard';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isSender: boolean;
}

export default function PatientChatWindow() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

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
            <ScreenHeader
                title={name || 'Patient'}
                onBackPress={() => router.back()}
            />

            {/* Chat Content Area */}
            <View className="flex-1">
                <ScrollView
                    className="flex-1 px-4 pt-4"
                    contentContainerStyle={{ gap: 16 }}
                >
                    <PatientDetailsCard patientName={name} />
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
            </View>

            {/* Bottom Action Bar */}
            <BottomActionBar
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                onPlusPress={() => { }}
                onCameraPress={() => { }}
                onMicPress={() => { }}
                onSubmitEditing={handleSendMessage}
            />
        </View>
    );
}
