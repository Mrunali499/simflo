import AddCircleIcon from '@/assets/images/add_circle.svg';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export const Contact = () => {
    return (
        <View>
            <Text className="text-[13px] font-semibold leading-[21px] tracking-[-0.32px] text-text-dark mb-2 font-inter">Guest Name</Text>
            <Pressable className="w-full h-[46px] bg-white border border-dashed border-border-default rounded-[9px] flex-row items-center justify-center gap-2">
                <AddCircleIcon width={24} height={24} />
                <Text className="text-sm font-medium text-text-figma-gray">Contacts</Text>
            </Pressable>
        </View>
    );
};
