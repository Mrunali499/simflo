import CameraIcon from '@/assets/images/camera-icon.svg';
import PlusIcon from '@/assets/images/plus-icon.svg';
import PurplePlusIcon from '@/assets/images/purple-plus.svg';
import { Circle, Mic, Send, Trash2 } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface BottomActionBarProps {
    placeholder?: string;
    onPlusPress?: () => void;
    onCameraPress?: () => void;
    onMicPress?: () => void; // Keeps original for legacy or simple tap
    onStartRecording?: () => void;
    onStopRecording?: () => void;
    onCancelRecording?: () => void;
    isRecording?: boolean;
    recordingTime?: number;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
    value?: string;
}

export const BottomActionBar = ({
    placeholder = 'Type a message...',
    onPlusPress,
    onCameraPress,
    onMicPress,
    onStartRecording,
    onStopRecording,
    onCancelRecording,
    isRecording = false,
    recordingTime = 0,
    onChangeText,
    onSubmitEditing,
    value,
}: BottomActionBarProps) => {
    const [isPlusActive, setIsPlusActive] = useState(false);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isRecording) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 0.5,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isRecording]);

    const handlePlusPress = () => {
        setIsPlusActive(!isPlusActive);
        onPlusPress?.();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (isRecording) {
        return (
            <View className="flex-row items-center bg-action-bar-bg px-4 py-3 border-t border-border-default">
                <TouchableOpacity onPress={onCancelRecording} className="mr-4">
                    <Trash2 size={24} color="#EF4444" />
                </TouchableOpacity>

                <View className="flex-1 flex-row items-center gap-2">
                    <Animated.View style={{ opacity: pulseAnim }}>
                        <Circle size={12} color="#EF4444" fill="#EF4444" />
                    </Animated.View>
                    <Text className="text-[#EF4444] font-inter font-medium text-[16px]">
                        Recording {formatTime(recordingTime)}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={onStopRecording}
                    className="w-10 h-10 rounded-full bg-primary items-center justify-center"
                >
                    <Send size={20} color="white" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-row items-center bg-action-bar-bg px-4 py-3 border-t border-border-default">
            {/* Plus Button */}
            <TouchableOpacity
                onPress={handlePlusPress}
                className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${isPlusActive ? 'bg-plus-active-bg' : 'bg-primary'}`}
                activeOpacity={0.7}
            >
                {isPlusActive ? (
                    <PurplePlusIcon width={18} height={18} />
                ) : (
                    <PlusIcon width={18} height={18} />
                )}
            </TouchableOpacity>

            {/* Message Input */}
            <View className="flex-1 flex-row items-center justify-center h-[36px] bg-white rounded-[22px] px-[5px] gap-[9px] mr-3">
                <TextInput
                    className="flex-1 font-inter font-normal text-[14px] leading-[17px] text-text-dark"
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType="send"
                />
            </View>

            {/* Camera Button */}
            {!value && (
                <TouchableOpacity
                    onPress={onCameraPress}
                    className="w-10 h-10 items-center justify-center"
                >
                    <CameraIcon width={20} height={18} />
                </TouchableOpacity>
            )}

            {/* Microphone Button */}
            <TouchableOpacity
                onPress={onStartRecording || onMicPress}
                className="w-10 h-10 items-center justify-center"
            >
                <Mic size={24} color={isRecording ? "#EF4444" : "#7C3AED"} />
            </TouchableOpacity>

            {/* Send Button (Visible only when text is typed) */}
            {value ? (
                <TouchableOpacity
                    onPress={onSubmitEditing}
                    className="w-10 h-10 rounded-full bg-primary items-center justify-center ml-2"
                >
                    <Send size={20} color="white" />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};
