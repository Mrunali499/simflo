import { BottomTabNavigation, ConversationHeader, ConversationList, FeaturePage, FilterList } from '@/components/core';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { api, useQuery } from 'simflo-backend/client';

export default function ConversationPage() {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [activeTab, setActiveTab] = useState('feature');
    const queryInput = useMemo(() => ({}), []);
    debugger;
    const { data: conversations = [], isLoading } = useQuery(api.core.conversation.list, queryInput) as { data: any[], isLoading: boolean };
   
    console.log("🚀 ~ ConversationPage ~ conversations:", conversations);

    const chatData = Array(5).fill({
        name: 'Mathew Keith',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '10 min',
        unreadCount: 2
    });

    return (
        <View className="flex-1 bg-white">
            {activeTab === 'chat' && (
                <>
                    <ConversationHeader />
                    <FilterList selectedFilter={selectedFilter} onSelect={setSelectedFilter} />
                    <ConversationList
                        data={chatData}
                        onItemPress={() => router.push('/chatwindow')}
                    />
                </>
            )}

            {activeTab === 'feature' && <FeaturePage />}

            {activeTab !== 'chat' && activeTab !== 'feature' && <View className="flex-1" />}

            <BottomTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
    );
}
