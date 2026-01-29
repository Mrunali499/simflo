import CelebrationIcon from '@/assets/images/celebration.svg';
import EventIcon from '@/assets/images/event1.svg';
import CopyIcon from '@/assets/images/file_copy.svg';
import KeyIcon from '@/assets/images/key_vertical.svg';
import MailIcon from '@/assets/images/mail.svg';
import ShareIcon from '@/assets/images/share.svg';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const GuestVisitCard = () => {
    return (
        <View
            className="w-[272px] h-[435px] bg-white rounded-[13px] relative shadow-custom-card"
        >
            {/* Header */}
            <View className="w-full h-[47px] bg-[--visit-type-active-bg] rounded-t-[13px] flex-row items-center justify-between px-4">
                <Text className="font-bold text-[15px] text-black tracking-widest font-inter">Anita Singh</Text>
                <View className="w-[104px] h-[21px] bg-[--status-upcoming] rounded-[17px] items-center justify-center">
                    <Text className="text-[10px] font-medium text-white font-inter">Upcoming Guest</Text>
                </View>
            </View>

            {/* Content */}
            <View className="p-4 pt-[11px] flex-1">
                {/* Purpose and Type Row */}
                <View className="space-y-[11px] mb-[11px] pl-2">
                    {/* Purpose */}
                    <View className="flex-row items-center gap-3">
                        <View className="w-[31px] h-[31px] bg-[#F0F2FC] rounded-[5px] items-center justify-center">
                            <CelebrationIcon width={20} height={20} fill="var(--primary)" />
                        </View>
                        <View>
                            <Text className="text-[8px] text-[#A1A1A1] font-medium font-inter leading-[21px]">Purpose of visit</Text>
                            <Text className="text-[10px] font-semibold text-[#111111] font-inter leading-[21px]">Party</Text>
                        </View>
                    </View>

                    {/* Visit Type */}
                    <View className="flex-row items-center gap-3">
                        <View className="w-[31px] h-[31px] bg-[#F0F2FC] rounded-[5px] items-center justify-center">
                            <EventIcon width={20} height={20} fill="var(--icon-warning)" />
                        </View>
                        <View>
                            <Text className="text-[8px] text-[#A1A1A1] font-medium font-inter leading-[21px]">Visit Type</Text>
                            <Text className="text-[10px] font-semibold text-[#111111] font-inter leading-[21px]">One-Time</Text>
                        </View>
                    </View>
                </View>

                {/* Visit Schedule */}
                <View className="w-[246px] h-[98px] bg-[--bg-card-neutral] rounded-[10px] p-3 self-center mb-[11px] shadow-custom-schedule">
                    <Text className="text-[10px] font-bold text-text-header tracking-[2px] mb-3 font-inter uppercase">VISIT SCHEDULE</Text>
                    <View className="flex-row justify-between w-[90%]">
                        <View>
                            <Text className="text-[12px] text-text-secondary font-inter mb-1">Date</Text>
                            <Text className="text-[13px] font-bold text-black font-inter">Jan 14, 2026</Text>
                        </View>
                        <View>
                            <Text className="text-[12px] text-text-secondary font-inter mb-1">Time</Text>
                            <Text className="text-[13px] font-bold text-black font-inter">10:00 AM</Text>
                        </View>
                    </View>
                </View>

                {/* Guest Passcode */}
                <View className="w-[239px] h-[156px] bg-[--visit-type-active-bg] rounded-[13px] relative self-center shadow-custom-passcode">
                    {/* Used Badge */}
                    <View className="absolute right-[9px] top-[8px] w-[49px] h-[18px] bg-[--status-used-bg] rounded-[17px] items-center justify-center z-10">
                        <Text className="text-[10px] text-white font-medium font-inter tracking-[-0.32px] leading-[21px]">Used</Text>
                    </View>

                    <View className="p-3">
                        <View className="flex-row items-center gap-3 mb-3">
                            <View className="w-[31px] h-[31px] bg-primary rounded-[5px] items-center justify-center">
                                <KeyIcon width={19} height={19} fill="white" />
                            </View>
                            <Text className="text-[12px] font-semibold text-[#3B3B3B] font-inter tracking-[2px] leading-[21px]">Guest Passcode</Text>
                        </View>

                        <View className="flex-row items-start justify-between mt-1">
                            {/* Passcode Box */}
                            <View className="w-[161px] h-[70px] bg-[#F0F2FC] border border-dashed border-primary rounded-[13px] items-center justify-center">
                                <Text className="text-[18px] font-bold text-black tracking-widest font-inter">GPC - 8472</Text>
                                <Text className="text-[9px] text-text-description font-inter">Valid for 24 hours</Text>
                            </View>

                            {/* Actions */}
                            <View className="gap-2 mr-2">
                                <TouchableOpacity className="w-[31px] h-[31px] bg-primary rounded-[5px] items-center justify-center">
                                    <CopyIcon width={19} height={19} fill="white" />
                                </TouchableOpacity>
                                <TouchableOpacity className="w-[31px] h-[31px] bg-primary rounded-[5px] items-center justify-center">
                                    <ShareIcon width={19} height={19} fill="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="flex-row items-center justify-end w-full mt-1 pr-2 gap-1">
                            <Text className="text-[10px] text-[--text-timestamp] font-inter">10:00 AM</Text>
                            <MailIcon width={14} height={14} fill="var(--text-timestamp)" />
                        </View>

                    </View>
                </View>
            </View>
        </View>
    );
};
