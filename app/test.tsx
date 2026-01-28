import { ConversationHeader } from '@/components/core';
import React from 'react';
import { View } from 'react-native';

export default function ConversationsScreen() {
    return (
        <View className="flex-1 bg-white">
            <ConversationHeader />
        </View>
    );
}
