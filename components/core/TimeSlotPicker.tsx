import AlarmIcon from '@/assets/images/alarm_icon.svg';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface TimeSlotPickerProps {
    startTime: string;
    endTime: string;
    onPressStart?: () => void;
    onPressEnd?: () => void;
}

export function TimeSlotPicker({
    startTime,
    endTime,
    onPressStart,
    onPressEnd,
}: TimeSlotPickerProps) {
    return (
        <View className="mb-4 w-full">
            <Text className="text-[13px] leading-[21px] tracking-[-0.32px] font-semibold text-text-dark mb-[4px] font-inter">
                Time Slot
            </Text>
            <View className="flex-row gap-3 w-full">
                {/* From Card */}
                <TouchableOpacity
                    onPress={onPressStart}
                    activeOpacity={0.7}
                    className="bg-white rounded-[12px] flex-1 h-[46px] border border-border-default shadow-sm flex-row items-center relative"
                >
                    <Text className="absolute left-[12px] top-[4px] text-[10px] leading-[14px] font-medium text-date-text tracking-[-0.32px]">From</Text>
                    <View className="absolute left-[12px] top-[22px]">
                        <AlarmIcon width={14} height={14} color="var(--icon-inactive)" />
                    </View>
                    <Text className="w-full text-center absolute top-[12px] text-[14px] leading-[21px] font-medium text-black tracking-[-0.32px]">{startTime}</Text>
                </TouchableOpacity>

                {/* To Card */}
                <TouchableOpacity
                    onPress={onPressEnd}
                    activeOpacity={0.7}
                    className="bg-white rounded-[12px] flex-1 h-[46px] border border-border-default shadow-sm flex-row items-center relative"
                >
                    <Text className="absolute left-[12px] top-[4px] text-[10px] leading-[14px] font-medium text-date-text tracking-[-0.32px]">To</Text>
                    <View className="absolute left-[12px] top-[22px]">
                        <AlarmIcon width={14} height={14} color="var(--icon-inactive)" />
                    </View>
                    <Text className="w-full text-center absolute top-[12px] text-[14px] leading-[21px] font-medium text-black tracking-[-0.32px]">{endTime}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
