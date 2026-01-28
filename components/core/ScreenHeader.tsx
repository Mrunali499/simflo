import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowBackIcon from '@/assets/images/arrow_back_icon.svg';
import ThreeDotIcon from '@/assets/images/3dot_icon.svg';

export interface ScreenHeaderProps {
    title: string;
    onBackPress?: () => void;
}

export function ScreenHeader({ title, onBackPress }: ScreenHeaderProps) {
    const { top } = useSafeAreaInsets();
    return (
        <View className="bg-white pt-[50px]" style={{ paddingTop: top + 50 }}>
            <View className="flex-row items-center justify-between pb-4 pl-6 pr-6">
                {/* Left Section: Back Arrow */}
                <TouchableOpacity
                    onPress={onBackPress}
                    activeOpacity={0.7}
                    className="items-center justify-center mr-[11px] w-6 h-6"
                >
                    <ArrowBackIcon width={15} height={15} className="text-text-figma-gray" />
                </TouchableOpacity>

                {/* Center Section: Title */}
                <Text
                    className="flex-1 font-semibold text-text-figma-gray text-[18px] leading-[21px] tracking-[-0.32px]"
                >
                    {title}
                </Text>

                {/* Right Section: Menu Icon */}
                <View className="items-center justify-center bg-search-bg w-[26px] h-6 rounded-[16px]">
                    <ThreeDotIcon width={20} height={20} />
                </View>
            </View>
            {/* Bottom Border Line */}
            <View className="w-[372px] h-[1px] bg-border-subtle mx-auto" />
        </View>
    );
}
