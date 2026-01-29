import React from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

interface CalendarProps {
    onDateSelect: (date: Date) => void;
    selectedDate?: Date;
    minDate?: Date;
}

export const Calendar = ({ onDateSelect, selectedDate, minDate }: CalendarProps) => {
    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handleDayPress = (day: any) => {
        const date = new Date(day.dateString);
        onDateSelect(date);
    };

    const markedDates = selectedDate
        ? {
            [formatDate(selectedDate)]: {
                selected: true,
                selectedColor: '#7B54FA',
            },
        }
        : {};

    return (
        <View className="bg-white rounded-xl overflow-hidden border border-border-default shadow-lg">
            <RNCalendar
                onDayPress={handleDayPress}
                markedDates={markedDates}
                minDate={minDate ? formatDate(minDate) : undefined}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#666666',
                    selectedDayBackgroundColor: '#7B54FA',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#7B54FA',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#7B54FA',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#7B54FA',
                    monthTextColor: '#2d4150',
                    indicatorColor: '#7B54FA',
                    textDayFontFamily: 'Inter',
                    textMonthFontFamily: 'Inter',
                    textDayHeaderFontFamily: 'Inter',
                    textDayFontWeight: '500',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '500',
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 12,
                }}
            />
        </View>
    );
};
