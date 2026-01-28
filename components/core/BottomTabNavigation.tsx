import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

const tabs = [
    { id: 'chat', icon: require('@/assets/images/chat_bubble.svg') },
    { id: 'grid', icon: require('@/assets/images/box.svg') },
    { id: 'layers', icon: require('@/assets/images/stacks.svg') },
    { id: 'profile', icon: require('@/assets/images/person.svg') },
];

export const BottomTabNavigation = () => {
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <View className="flex-row items-center justify-around bg-white py-4 border-t border-gray-100 w-full">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <Pressable
                        key={tab.id}
                        onPress={() => setActiveTab(tab.id)}
                        className="items-center justify-center p-2"
                        hitSlop={10}
                    >
                        <Image
                            source={tab.icon}
                            className={`${isActive ? 'w-7 h-7' : 'w-6 h-6'}`}
                            tintColor={isActive ? Colors.light.primary : '#9CA3AF'}
                            contentFit="contain"
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};
