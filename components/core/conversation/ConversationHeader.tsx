import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ConversationHeader = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="bg-white pb-3" style={{ paddingTop: Math.max(insets.top, 20) }}>
            <Text className="ml-[18px] mt-4 text-[18px] font-semibold text-text-dark leading-[21px] tracking-[-0.32px]">
                Conversations
            </Text>
            <View className="mx-4 mt-[10px] h-[41px] bg-search-bg rounded-[8px] justify-center px-4">
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="var(--search-placeholder)"
                    className="text-base text-text-dark"
                />
            </View>
        </View>
    );
};
