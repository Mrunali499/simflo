import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export const SocialPlatformSelector = () => {
    return (
        <View className="w-full">
            {/* Title */}
            <Text className="font-inter font-semibold text-[13px] leading-[21px] tracking-[-0.32px] text-[#464646] mb-[5px]">
                Company/platform Name
            </Text>

            {/* Main Dashed Container */}
            <View className="w-[324px] h-[65px] border-[1px] border-dashed border-[#C6C6C6] rounded-[9px] bg-white flex-row items-center">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingLeft: 12, paddingRight: 8, alignItems: 'center', height: '100%' }}
                >
                    {/* 5 Placeholder Boxes */}
                    {[1, 2, 3, 4, 5].map((item) => (
                        <View
                            key={item}
                            className="w-[44px] h-[46px] border-[1px] border-dashed border-[#C6C6C6] rounded-[9px] bg-white"
                        />
                    ))}

                    {/* 'Other' Box */}
                    <View className="w-[44px] h-[46px] border-[1px] border-dashed border-[#C6C6C6] rounded-[9px] bg-white items-center justify-center">
                        <Text className="font-inter font-medium text-[10px] leading-[21px] tracking-[-0.32px] text-[#787878] text-center">
                            Other
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
