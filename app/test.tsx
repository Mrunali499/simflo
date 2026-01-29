import { TimeSlotPicker } from '@/components/core/TimeSlotPicker';
import React from 'react';
import { View, Text } from 'react-native';

export default function TestScreen() {
    return (
        <View className="flex-1 bg-gray-50 p-6 justify-center">
            <Text className="text-lg font-bold mb-4">TimeSlotPicker Test</Text>

            <TimeSlotPicker
                startTime="9:00 AM"
                endTime="10:00 AM"
                onPressStart={() => console.log('Start Pressed')}
                onPressEnd={() => console.log('End Pressed')}
            />
        </View>
    );
}
