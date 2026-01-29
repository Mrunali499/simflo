import ProfilePhoto from '@/assets/images/profile-photo.svg';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ChatListItemProps {
    onPress?: () => void;
}

export const ChatListItem = ({ onPress }: ChatListItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row items-center pt-[8px] pb-[12px] px-4 gap-3 w-full border-b border-chat-border">
            {/* Avatar */}
            <View className="w-12 h-12 rounded-full overflow-hidden">
                <ProfilePhoto width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-baseline mb-0.5">
                    <Text className="text-text-header text-lg font-semibold">Mathew Keith</Text>
                    <Text className="text-text-secondary text-xs">10 min</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="text-text-secondary text-sm flex-1 mr-2" numberOfLines={1}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                    <View className="bg-primary w-5 h-5 rounded-full items-center justify-center">
                        <Text className="text-white text-xs font-bold">2</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
