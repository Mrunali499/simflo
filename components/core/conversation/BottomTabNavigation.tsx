import FeatureIcon from '@/assets/images/Feature_icon.svg';
import VectorIcon from '@/assets/images/Vector.svg';
import ChatIcon from '@/assets/images/chat_bubble.svg';
import PersonIcon from '@/assets/images/person.svg';
import StacksIcon from '@/assets/images/stacks.svg';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
    { id: 'feature', icon: FeatureIcon },
    { id: 'chat', icon: ChatIcon },
    { id: 'grid', icon: VectorIcon },
    { id: 'layers', icon: StacksIcon },
    { id: 'profile', icon: PersonIcon },
];

export const BottomTabNavigation = () => {
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <SafeAreaView
            edges={['bottom']}
            className="flex-row items-center justify-around bg-white border-t border-gray-100 w-full pt-4"
        >
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
        </SafeAreaView>
    );
};