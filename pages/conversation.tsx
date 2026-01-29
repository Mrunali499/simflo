import { BottomTabNavigation, ChatListItem, ConversationHeader, FilterChip } from '@/components/core';
import { Icon } from '@/components/ui/icon';
import { router } from 'expo-router';
import { MoreVertical } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function ConversationPage() {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const filters = ['All', 'Favorite', 'Unread', 'Groups', 'My Society'];

    return (
        <View className="flex-1 bg-white">
            <ConversationHeader />

            <View className="flex-row items-center px-4 py-2">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingRight: 16 }}
                    className="flex-1"
                >
                    {filters.map((filter) => (
                        <FilterChip
                            key={filter}
                            label={filter}
                            selected={selectedFilter === filter}
                            onPress={() => setSelectedFilter(filter)}
                        />
                    ))}
                </ScrollView>
                <View className="pl-2">
                    <Icon as={MoreVertical} className="text-gray-500" size={20} />
                </View>
            </View>

            <ScrollView className="flex-1 mt-2">
                {/* Demonstrating multiple list items */}
                <ChatListItem onPress={() => router.push('/chatwindow')} />
                <ChatListItem onPress={() => router.push('/chatwindow')} />
                <ChatListItem onPress={() => router.push('/chatwindow')} />
                <ChatListItem onPress={() => router.push('/chatwindow')} />
            </ScrollView>

            <BottomTabNavigation />
        </View>
    );
}
