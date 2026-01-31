import CameraIcon from '@/assets/images/camera-icon.svg';
import MicIcon from '@/assets/images/mic-icon.svg';
import PlusIcon from '@/assets/images/plus-icon.svg';
import PurplePlusIcon from '@/assets/images/purple-plus.svg';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../input';

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
        <SafeAreaView
            edges={['bottom']}
            className="flex-row items-center bg-action-bar-bg px-4 border-t border-border-default pt-3"
        >
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
            <Input
                variant="chat"
                containerClassName="flex-1 mr-3"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                returnKeyType="send"
            />

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
        </SafeAreaView>
    );
};
