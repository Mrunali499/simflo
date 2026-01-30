import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Input } from '@/components/core';

export const ConversationHeader = ({ title = 'Conversations' }: { title?: string }) => {
    const insets = useSafeAreaInsets();

    return (
        <View className="bg-white pb-3" style={{ paddingTop: Math.max(insets.top, 20) }}>
            <Text className="font-inter ml-[18px] mt-4 text-[18px] font-semibold text-text-dark leading-[21px] tracking-[-0.32px]">
                {title}
            </Text>
            <Input
                placeholder="Search..."
                containerClassName="mx-4 mt-[10px] mb-0"
                inputClassName="bg-search-bg h-[41px] border-0 rounded-[8px] text-base placeholder:text-search-placeholder caret-text-dark"
            />
        </View>
    );
};
