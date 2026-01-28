import BoxIcon from '@/assets/images/box.svg';
import CalendarIcon from '@/assets/images/calendar_month.svg';
import HandshakeIcon from '@/assets/images/handshake.svg';
import TaxiIcon from '@/assets/images/local_taxi.svg';
import PersonIcon from '@/assets/images/person.svg';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const visitorTypes = [
    { id: 'guest', label: 'Guest', icon: PersonIcon },
    { id: 'helper', label: 'Helper', icon: HandshakeIcon },
    { id: 'delivery', label: 'Delivery', icon: BoxIcon },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'cab', label: 'Cab', icon: TaxiIcon },
];

export const VisitorTypeCard = () => {
    return (
        <View
            className="w-[331px] md:w-full h-[254px] md:h-auto bg-white rounded-[20px] p-5 flex-row flex-wrap md:flex-nowrap gap-x-[15px] gap-y-[20px] md:justify-around shadow-sm shadow-black/25 android:elevation-5"
        >
            {visitorTypes.map((item) => (
                <Pressable key={item.id} className="items-center w-[85px]">
                    <View className="w-[56.52px] h-[56.52px] bg-[#7B54FA] rounded-[11.56px] items-center justify-center">
                        <item.icon width={24} height={24} fill="white" />
                    </View>
                    <Text className="mt-2 font-medium text-[14px] leading-[27px] tracking-[-0.41px] text-[#737373]">
                        {item.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};
