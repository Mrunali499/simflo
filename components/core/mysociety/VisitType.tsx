import AutoRenewIcon from '@/assets/images/autorenew.svg';
import EventIcon from '@/assets/images/event.svg';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export const VisitType = () => {
    const [selectedType, setSelectedType] = useState<'One-Time' | 'Recurring'>('One-Time');

    return (
        <View className="flex-row gap-8">
            <View>
                <Text className="text-base font-semibold text-text-header mb-4">Visit Type</Text>
                <View className="flex-row gap-8">
                    {/* One-Time Button */}
                    <Pressable
                        onPress={() => setSelectedType('One-Time')}
                        className={`w-[145px] h-[46px] flex-row items-center justify-center rounded-[9px] border px-4 gap-2 box-border ${selectedType === 'One-Time'
                            ? 'bg-[--visit-type-active-bg] border-primary'
                            : 'bg-white border-border-default'
                            }`}
                    >
                        <EventIcon
                            width={24}
                            height={24}
                            fill={selectedType === 'One-Time' ? '#7B54FA' : '#464646'}
                        />
                        <Text
                            className={`text-sm font-medium ${selectedType === 'One-Time' ? 'text-primary' : 'text-[#464646]'
                                }`}
                        >
                            One-Time
                        </Text>
                    </Pressable>

                    {/* Recurring Button */}
                    <Pressable
                        onPress={() => setSelectedType('Recurring')}
                        className={`w-[145px] h-[46px] flex-row items-center justify-center rounded-[9px] border px-4 gap-2 box-border ${selectedType === 'Recurring'
                            ? 'bg-[--visit-type-active-bg] border-primary'
                            : 'bg-white border-border-default'
                            }`}
                    >
                        <AutoRenewIcon
                            width={24}
                            height={24}
                            fill={selectedType === 'Recurring' ? '#7B54FA' : '#464646'}
                        />
                        <Text
                            className={`text-sm font-medium ${selectedType === 'Recurring' ? 'text-primary' : 'text-[#464646]'
                                }`}
                        >
                            Recurring
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
