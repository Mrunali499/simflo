import { Button, Contact, DateSelection, Input, TimeSlotPicker, VisitType } from '@/components/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export const GuestForm = () => {
    const [purpose, setPurpose] = useState('');

    return (
        <View
            className="w-full min-h-[625px] bg-white border border-[#CDCDCD] rounded-[13px] p-4 flex-col gap-4"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 5.2,
                elevation: 5,
            }}
        >
            {/* Guest Name */}
            <Contact />

            {/* Purpose of Visit */}
            <Input
                label="Purpose of visit"
                placeholder="Enter visit purpose"
                value={purpose}
                onChangeText={setPurpose}
            />

            {/* Visit Type */}
            <VisitType />

            {/* Select Date */}
            <DateSelection />

            {/* Time Slot */}
            <TimeSlotPicker
                startTime="9:00 AM"
                endTime="10:00 AM"
            />

            {/* Add Guest Button */}
            <View className="mt-auto">
                <Button title="Add Guest" onPress={() => { }} />
            </View>
        </View>
    );
};
