import CalendarIcon from '@/assets/images/calendar_month.svg';
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
        <View className="space-y-4">
            {/* Title */}
            <Text variant="h2" className="text-gray-800 font-medium">Select Date</Text>

            {/* Date List */}
            {/* Date List */}
            <View className="flex-row flex-wrap justify-between gap-2">
                {dates.map((item) => {
                    const isSelected = selectedDateId === item.id;
                    return (
                        <Pressable
                            key={item.id}
                            onPress={() => setSelectedDateId(item.id)}
                            className={`w-[13%] min-w-[45px] h-[70px] rounded-2xl items-center justify-center space-y-1 ${isSelected ? 'bg-[#7B54FA]' : 'bg-gray-100'
                                }`}
                        >
                            <Text className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                                {item.day}
                            </Text>
                            <Text className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                                {item.date}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Custom Date Button */}
            <Pressable className="w-full border border-dashed border-gray-300 rounded-2xl h-14 flex-row items-center justify-center space-x-2 active:bg-gray-50">
                <CalendarIcon width={24} height={24} fill="#7B54FA" />
                <Text className="text-[#7B54FA] font-medium text-lg">Custom Date</Text>
            </Pressable>
        </View>
    );
};
