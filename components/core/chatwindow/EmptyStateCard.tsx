import UserAddedIcon from '@/assets/images/user_added.svg';
import React from 'react';
import { Text, View } from 'react-native';

export const EmptyStateCard = () => {
    return (
        <View className="items-center bg-white">
            <View className="w-[268px] items-center">
                <View className="w-[72px] h-[72px] rounded-full bg-bg-icon-circle items-center justify-center mb-4">
                    <UserAddedIcon width={32} height={32} className="text-primary" fill="currentColor" />
                </View>
                <Text className="font-inter text-text-header font-semibold text-[24px] mb-2 text-center leading-[21px] tracking-[-0.32px]">
                    No visitors added yet
                </Text>
                <Text className="font-inter text-text-description font-medium text-[18px] text-center leading-[25px] tracking-[-1px]">
                    tap + to add a visitor and start managing your guest entries
                </Text>
            </View>
        </View>
    );
};
