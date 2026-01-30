import ProfilePhoto from '@/assets/images/profile-photo.svg';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ChatListItemProps {
    name: string;
    message: string;
    time: string;
    unreadCount?: number;
    onPress?: () => void;
    avatar?: React.ReactNode;
}

export const ChatListItem = ({ name, message, time, unreadCount, onPress, avatar }: ChatListItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row items-center pt-[8px] pb-[12px] px-4 gap-3 w-full border-b border-chat-border">
            {/* Avatar */}
            <View className="w-12 h-12 rounded-full overflow-hidden items-center justify-center">
                {avatar ? avatar : <ProfilePhoto width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />}
            </View>

            <View className="flex-1">
                <View className="flex-row justify-between items-baseline mb-0.5">
                    <Text className="font-inter text-text-header text-lg font-semibold">{name}</Text>
                    <Text className="font-inter text-text-secondary text-xs">{time}</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="font-inter text-text-secondary text-sm flex-1 mr-2" numberOfLines={1}>
                        {message}
                    </Text>
                    {unreadCount ? (
                        <View className="bg-primary w-5 h-5 rounded-full items-center justify-center">
                            <Text className="font-inter text-white text-xs font-bold">{unreadCount}</Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface ConversationListProps {
    data: Omit<ChatListItemProps, 'onPress'>[];
    onItemPress?: (item: Omit<ChatListItemProps, 'onPress'>) => void;
}

export const ConversationList = ({ data, onItemPress }: ConversationListProps) => {
    return (
        <ScrollView className="flex-1 mt-2">
            {data.map((item, index) => (
                <ChatListItem
                    key={index}
                    name={item.name}
                    message={item.message}
                    time={item.time}
                    unreadCount={item.unreadCount}
                    onPress={() => onItemPress?.(item)}
                    avatar={item.avatar}
                />
            ))}
        </ScrollView>
    );
};
