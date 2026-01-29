import { BottomTabNavigation, ChatListItem, ConversationHeader, FilterList } from '@/components/core';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function ConversationPage() {
    const [selectedFilter, setSelectedFilter] = useState('All');

    return (
        <View className="flex-1 bg-white">
            <ConversationHeader />

            <FilterList selectedFilter={selectedFilter} onSelect={setSelectedFilter} />

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
