import ArrowBackIcon from '@/assets/images/arrow_back_icon.svg';
import { Icon } from '@/components/ui/icon';
import { MoreVertical } from 'lucide-react-native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ScreenHeaderProps {
    title: string;
    onBackPress?: () => void;
}

export function ScreenHeader({ title, onBackPress }: ScreenHeaderProps) {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === 'web' ? 20 : top;

    return (
        <View className="bg-white" style={{ paddingTop }}>
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
                    className="font-inter flex-1 font-semibold text-text-figma-gray text-[18px] leading-[21px] tracking-[-0.32px]"
                >
                    {title}
                </Text>

                {/* Right Section: Menu Icon */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-search-bg rounded-full w-[26px] h-[24px] justify-center items-center"
                >
                    <Icon as={MoreVertical} className="text-gray-500" size={16} />
                </TouchableOpacity>
            </View>
            {/* Bottom Border Line */}
            <View className="w-[372px] h-[1px] bg-border-subtle mx-auto" />
        </View>
    );
}
