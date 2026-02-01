import { BottomTabNavigation, ConversationHeader, ConversationList, FeaturePage, FilterList } from '@/components/core';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { api, useQuery } from 'simflo-backend/client';

export default function ConversationPage() {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [activeTab, setActiveTab] = useState('feature');
    
    const { data: conversations = [], isLoading } = useQuery(api.core.conversation.list, {}) as { data: any[], isLoading: boolean };
   
    console.log("🚀 ~ ConversationPage ~ conversations:", conversations);
//  const chatData = Array(5).fill({
//         name: 'Mathew Keith',
//         message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         time: '10 min',
//            unreadCount: 2});

    // Map backend data to UI props
    const chatData = conversations.map((conv: any) => {
        // Determine title
        let name = conv.name;
        // Determine last message text
        const lastMsg = conv.lastMessage;
        const messageText = lastMsg?.text || (lastMsg?.type === 'image' ? 'Sent an image' : 'No messages yet');
        
        // Format time (simplified)
        const time = lastMsg?.createdAt ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        return {
            id: conv.id, // Keep ID for routing if needed
            name,
            message: messageText,
            time,
            unreadCount: conv.unreadCount || 0
        };
    });

    return (
        <View className="flex-1 bg-white">
            {activeTab === 'chat' && (
                <>
                    <ConversationHeader />
                    <FilterList selectedFilter={selectedFilter} onSelect={setSelectedFilter} />
                    <ConversationList
                        data={chatData}
                        onItemPress={(item) => router.push({ pathname: '/chatwindow', params: { conversationId: (item as any).id, name: item.name } })}
                    />
                </>
            )}

            {activeTab === 'feature' && <FeaturePage />}

            {activeTab !== 'chat' && activeTab !== 'feature' && <View className="flex-1" />}

            <BottomTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
    );
}
