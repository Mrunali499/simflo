import FeatureIcon from '@/assets/images/Feature_icon.png';
import VectorIcon from '@/assets/images/Vector.svg';
import ChatIcon from '@/assets/images/chat_bubble.svg';
import PersonIcon from '@/assets/images/person.svg';
import StacksIcon from '@/assets/images/stacks.svg';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
    { id: 'feature', icon: FeatureIcon },
    { id: 'chat', icon: ChatIcon },
    { id: 'grid', icon: VectorIcon },
    { id: 'layers', icon: StacksIcon },
    { id: 'profile', icon: PersonIcon },
];

interface BottomTabNavigationProps {
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
}

export const BottomTabNavigation = ({ activeTab = 'chat', onTabChange }: BottomTabNavigationProps) => {

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
                        onPress={() => onTabChange?.(tab.id)}
                        className="items-center justify-center p-2"

                    >
                        {tab.id === 'feature' ? (
                            <Image
                                source={tab.icon}
                                style={{ width: 20, height: 20, tintColor: isActive ? 'var(--primary)' : 'var(--icon-inactive)' }}
                                resizeMode="contain"
                            />
                        ) : (
                            <tab.icon
                                width={20}
                                height={20}
                                fill={isActive ? 'var(--primary)' : 'var(--icon-inactive)'}
                            />
                        )}
                    </Pressable>
                );
            })}
        </SafeAreaView>
    );
};