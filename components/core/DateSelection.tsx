import CalendarIcon from '@/assets/images/custom-date.svg';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Calendar } from './Calendar';

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
    const [selectedDateId, setSelectedDateId] = useState('3');
    const [showCalendar, setShowCalendar] = useState(false);
    const [customDate, setCustomDate] = useState<Date | null>(null);

    const handleDateSelect = (date: Date) => {
        setCustomDate(date);
        setSelectedDateId(''); // Deselect preset dates
        setShowCalendar(false);
    };

    const formatCustomDate = (date: Date) => {
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateNum = date.getDate();
        return { day, date: dateNum.toString() };
    };

    return (
        <View className="space-y-2">
            {/* Title */}
            <Text className="text-[13px] font-semibold leading-[21px] tracking-[-0.32px] text-text-dark font-inter">Select Date</Text>

            {/* Date Selection Card */}
            <View className="bg-white rounded-[9px] p-3 shadow-sm shadow-black/25 android:elevation-3 border border-gray-100">
                {/* Date List */}
                <View className="flex-row justify-between gap-1 mb-3">
                    {dates.map((item) => {
                        const isSelected = selectedDateId === item.id;
                        return (
                            <Pressable
                                key={item.id}
                                onPress={() => {
                                    setSelectedDateId(item.id);
                                    setCustomDate(null);
                                }}
                                className={`flex-1 h-[40px] rounded-[8px] items-center justify-center ${isSelected ? 'bg-primary' : 'bg-date-card-bg'
                                    }`}
                            >
                                <Text className={`font-inter font-medium text-[10px] ${isSelected ? 'text-white' : 'text-date-text'}`}>
                                    {item.day}
                                </Text>
                                <Text className={`font-inter font-medium text-[10px] ${isSelected ? 'text-white' : 'text-date-text'}`}>
                                    {item.date}
                                </Text>
                            </Pressable>
                        );
                    })}

                    {/* Custom Date Display */}
                    {customDate && (
                        <Pressable
                            onPress={() => setShowCalendar(true)}
                            className="flex-1 h-[40px] rounded-[8px] items-center justify-center bg-primary"
                        >
                            <Text className="font-inter font-medium text-[10px] text-white">
                                {formatCustomDate(customDate).day}
                            </Text>
                            <Text className="font-inter font-medium text-[10px] text-white">
                                {formatCustomDate(customDate).date}
                            </Text>
                        </Pressable>
                    )}
                </View>

                {/* Date Button */}
                <Pressable
                    onPress={() => setShowCalendar(true)}
                    className="w-full bg-white border border-dashed border-border-default rounded-[9px] h-[36px] flex-row items-center justify-center gap-2 active:opacity-80"
                >
                    <CalendarIcon width={20} height={20} fill="var(--primary)" />
                    <Text className="font-inter text-primary font-medium text-sm">Custom Date</Text>
                </Pressable>
            </View>

            {/* Calendar Modal */}
            <Modal
                visible={showCalendar}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <Pressable
                    className="flex-1 bg-black/50 items-center justify-center p-4"
                    onPress={() => setShowCalendar(false)}
                >
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <Calendar
                            onDateSelect={handleDateSelect}
                            selectedDate={customDate || undefined}
                            minDate={new Date()}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};
