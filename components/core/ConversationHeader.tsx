import React from 'react';
import { Text, TextInput, View } from 'react-native';

export const ConversationHeader = () => {
    return (
        <View className="bg-white">
            <Text className="ml-[18px] mt-[61px] text-[18px] font-semibold text-text-header leading-[21px] tracking-[-0.32px]">
                Conversations
            </Text>
            <View className="ml-[16px] mt-[10px] w-[370px] h-[41px] bg-bg-search rounded-[8px] justify-center px-4">
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#9CA3AF"
                    className="text-base text-[#]"
                />
            </View>
        </View>
    );
};
