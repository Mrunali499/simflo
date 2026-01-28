<<<<<<< HEAD
import { Colors } from '@/constants/theme';
=======
import VectorIcon from '@/assets/images/Vector.svg';
import ChatIcon from '@/assets/images/chat_bubble.svg';
import PersonIcon from '@/assets/images/person.svg';
>>>>>>> 1263a7cb7538c6d289375b0f62f75c5b8c9ace82
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

const tabs = [
<<<<<<< HEAD
    { id: 'chat', icon: require('@/assets/images/chat_bubble.svg') },
    { id: 'grid', icon: require('@/assets/images/box.svg') },
    { id: 'layers', icon: require('@/assets/images/stacks.svg') },
    { id: 'profile', icon: require('@/assets/images/person.svg') },
=======
    { id: 'chat', icon: ChatIcon, type: 'svg' },
    { id: 'grid', icon: VectorIcon, type: 'svg' },
    { id: 'layers', icon: require('@/assets/images/stacks.png'), type: 'png' },
    { id: 'profile', icon: PersonIcon, type: 'svg' },
>>>>>>> 1263a7cb7538c6d289375b0f62f75c5b8c9ace82
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
<<<<<<< HEAD
                        <Image
                            source={tab.icon}
                            className={`${isActive ? 'w-7 h-7' : 'w-6 h-6'}`}
                            tintColor={isActive ? Colors.light.primary : '#9CA3AF'}
                            contentFit="contain"
                        />
=======
                        {tab.type === 'svg' ? (
                            <tab.icon
                                width={20}
                                height={20}
                                fill={isActive ? '#7B54FA' : '#9CA3AF'}
                            />
                        ) : (
                            <Image
                                source={tab.icon}
                                className="w-5 h-5"
                                tintColor={isActive ? '#7B54FA' : '#9CA3AF'}
                                contentFit="contain"
                            />
                        )}
>>>>>>> 1263a7cb7538c6d289375b0f62f75c5b8c9ace82
                    </Pressable>
                );
            })}
        </View>
    );
};
