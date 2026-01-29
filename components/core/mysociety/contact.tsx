import AddCircleIcon from '@/assets/images/add_circle.svg';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export const Contact = () => {
    return (
        <View>
            <Text className="text-base font-semibold text-text-header mb-2">Guest Name</Text>
            <Pressable className="w-[323px] h-[46px] bg-white border border-dashed border-border-default rounded-[9px] flex-row items-center justify-center gap-2">
                <AddCircleIcon width={24} height={24} />
                <Text className="text-sm font-medium text-text-figma-gray">Contacts</Text>
            </Pressable>
        </View>
    );
};
