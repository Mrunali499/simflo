import CloseIcon from '@/assets/images/close_icon.svg';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ChatHeaderProps {
    title: string;
    onClose: () => void;
}

export function ChatHeader({ title, onClose }: ChatHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View className="bg-white" style={{ paddingTop: Math.max(insets.top, 20) }}>
            <View className="flex-row items-center justify-between px-4 pb-3">
                <View className="w-[24px]" />

                <Text className="text-[18px] leading-[21px] font-semibold text-text-figma-gray text-center tracking-[-0.32px] font-inter">
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onClose}
                    activeOpacity={0.7}
                    className="w-[24px] items-center justify-center"
                >
                    <CloseIcon width={14} height={14} color="var(--text-dark)" />
                </TouchableOpacity>
            </View>
            <View className="h-[1px] bg-border-subtle mx-4 mb-2" />
        </View>
    );
}
