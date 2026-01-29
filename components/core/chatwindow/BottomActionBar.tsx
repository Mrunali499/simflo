import CameraIcon from '@/assets/images/camera-icon.svg';
import MicIcon from '@/assets/images/mic-icon.svg';
import PlusIcon from '@/assets/images/plus-icon.svg';
import PurplePlusIcon from '@/assets/images/purple-plus.svg';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface BottomActionBarProps {
    placeholder?: string;
    onPlusPress?: () => void;
    onCameraPress?: () => void;
    onMicPress?: () => void;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
    value?: string;
}

export const BottomActionBar = ({
    placeholder = 'Type a message...',
    onPlusPress,
    onCameraPress,
    onMicPress,
    onChangeText,
    onSubmitEditing,
    value,
}: BottomActionBarProps) => {
    const [isPlusActive, setIsPlusActive] = useState(false);

    const handlePlusPress = () => {
        setIsPlusActive(!isPlusActive);
        onPlusPress?.();
    };

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
                    placeholderTextColor="var(--input-placeholder)"
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType="send"
                />
            </View>

            {/* Camera Button */}
            <TouchableOpacity
                onPress={onCameraPress}
                className="w-10 h-10 items-center justify-center"
            >
                <CameraIcon width={20} height={18} />
            </TouchableOpacity>

            {/* Microphone Button */}
            <TouchableOpacity
                onPress={onMicPress}
                className="w-10 h-10 items-center justify-center"
            >
                <MicIcon width={15} height={22} />
            </TouchableOpacity>
        </View>
    );
};
