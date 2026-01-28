import CalendarIcon from '@/assets/images/custom-date.svg';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

const dates = [
    { id: '1', day: 'Mon', date: '12' },
    { id: '2', day: 'Tue', date: '13' },
    { id: '3', day: 'Wed', date: '14' },
    { id: '4', day: 'Thur', date: '15' },
    { id: '5', day: 'Fri', date: '16' },
    { id: '6', day: 'Sat', date: '17' },
    { id: '7', day: 'Sun', date: '18' },
];

export const DateSelection = () => {
    const [selectedDateId, setSelectedDateId] = useState('3'); // Default to Wed 14

    return (
        <View className="w-full px-4 space-y-4">
            {/* Title */}
            <Text variant="h2" className="text-gray-800 font-medium">Select Date</Text>

            {/* Date Selection Card */}
            <View className="bg-white rounded-[9px] p-4 shadow-sm shadow-black/25 android:elevation-3">
                {/* Date List */}
                <View className="flex-row justify-between gap-2 mb-4">
                    {dates.map((item) => {
                        const isSelected = selectedDateId === item.id;
                        return (
                            <Pressable
                                key={item.id}
                                onPress={() => setSelectedDateId(item.id)}
                                className={`flex-1 h-[45px] rounded-[8px] items-center justify-center ${isSelected ? 'bg-primary' : 'bg-date-card-bg'
                                    }`}
                            >
                                <Text className={`font-medium text-[10px] ${isSelected ? 'text-white/80' : 'text-date-text'}`}>
                                    {item.day}
                                </Text>
                                <Text className={`font-medium text-[10px] ${isSelected ? 'text-white' : 'text-date-text'}`}>
                                    {item.date}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Custom Date Button */}
                <Pressable className="w-full bg-white border border-dashed border-border-default rounded-[9px] h-[38px] flex-row items-center justify-center space-x-2 active:opacity-80">
                    <CalendarIcon width={24} height={24} fill="var(--primary)" />
                    <Text className="text-primary font-medium text-lg">Custom Date</Text>
                </Pressable>
            </View>
        </View>
    );
};
