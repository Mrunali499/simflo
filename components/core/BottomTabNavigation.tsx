import VectorIcon from '@/assets/images/Vector.svg';
import ChatIcon from '@/assets/images/chat_bubble.svg';
import PersonIcon from '@/assets/images/person.svg';
import StacksIcon from '@/assets/images/stacks.svg';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

const tabs = [
    { id: 'chat', icon: ChatIcon },
    { id: 'grid', icon: VectorIcon },
    { id: 'layers', icon: StacksIcon },
    { id: 'profile', icon: PersonIcon },
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

                    >
                        <tab.icon
                            width={20}
                            height={20}
                            fill={isActive ? '#7B54FA' : '#9CA3AF'}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};