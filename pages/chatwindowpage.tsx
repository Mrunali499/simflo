import BoxIcon from '@/assets/images/box.svg';
import CalendarIcon from '@/assets/images/calendar_month.svg';
import HandshakeIcon from '@/assets/images/handshake.svg';
import TaxiIcon from '@/assets/images/local_taxi.svg';
import PersonIcon from '@/assets/images/person_icon.svg';
import { BottomActionBar } from '@/components/core/chatwindow/BottomActionBar';
import { EmptyStateCard } from '@/components/core/chatwindow/EmptyStateCard';
import { ScreenHeader } from '@/components/core/chatwindow/ScreenHeader';
import { WebCameraOverlay } from '@/components/core/chatwindow/WebCameraOverlay';
import { SenderAudioMsg } from '@/components/core/mysociety/SenderAudioMsg';
import { SenderImagemsg } from '@/components/core/mysociety/SenderImagemsg';
import { SenderTextmsg } from '@/components/core/mysociety/SenderTextmsg';
import { Textmsg } from '@/components/core/mysociety/Textmsg';
import { VisitorType, VisitorTypeCard } from '@/components/core/VisitorTypeCard';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';

interface Message {
    id: string;
    text?: string;
    imageUri?: string;
    audioUri?: string;
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

    // Voice Recording State
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

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
        }
    };

    // Voice Recording Handlers
    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status !== 'granted') {
                Alert.alert('Permission Denied', 'Microphone permission is required to record audio.');
                return;
            }

            console.log('Setting audio mode..');
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });

            console.log('Starting recording..');
            // Adjust recording options for better web compatibility
            const recordingOptions = Platform.OS === 'web'
                ? {
                    android: Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
                    ios: Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
                    web: {
                        mimeType: 'audio/webm',
                        bitsPerSecond: 128000,
                    },
                }
                : Audio.RecordingOptionsPresets.HIGH_QUALITY;

            const { recording: newRecording } = await Audio.Recording.createAsync(
                recordingOptions
            );

            setRecording(newRecording);
            setIsRecording(true);
            setRecordingTime(0);

            console.log('Recording started');

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (err) {
            console.error('Failed to start recording', err);
            Alert.alert('Error', 'Failed to start recording: ' + (err as Error).message);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;

        console.log('Stopping recording..');
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);

        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);
            setRecording(null);

            if (uri) {
                const newMessage: Message = {
                    id: Date.now().toString(),
                    audioUri: uri,
                    timestamp: new Date(),
                    isSender: true,
                };
                setMessages([...messages, newMessage]);
            }
        } catch (err) {
            console.error('Failed to stop recording', err);
            Alert.alert('Error', 'Failed to stop recording');
        }
    };

    const cancelRecording = async () => {
        if (!recording) return;

        console.log('Cancelling recording..');
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);

        try {
            await recording.stopAndUnloadAsync();
            setRecording(null);
            setRecordingTime(0);
            console.log('Recording cancelled');
        } catch (err) {
            console.error('Failed to cancel recording', err);
        }
    };

    const handleVisitorTypePress = (typeId: string) => {
        console.log('Selected visitor type:', typeId);
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
                                if (msg.audioUri) {
                                    return (
                                        <SenderAudioMsg
                                            key={msg.id}
                                            audioUri={msg.audioUri}
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

            {showVisitorTypeCard && (
                <View className="items-start pl-6 pb-4">
                    <VisitorTypeCard
                        visitorTypes={visitorTypes}
                        onTypePress={handleVisitorTypePress}
                    />
                </View>
            )}

            <BottomActionBar
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                onPlusPress={handlePlusPress}
                onCameraPress={handleCameraPress}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onCancelRecording={cancelRecording}
                isRecording={isRecording}
                recordingTime={recordingTime}
                onSubmitEditing={handleSendMessage}
            />

            <WebCameraOverlay
                isVisible={isWebCameraVisible}
                onClose={() => setIsWebCameraVisible(false)}
                onCapture={handlePhotoCaptured}
            />
        </View>
    );
}
