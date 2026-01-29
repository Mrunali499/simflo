import React from 'react';
import { Pressable, Text, View } from 'react-native';

export interface VisitorType {
    id: string;
    label: string;
    icon: React.ComponentType<{ width: number; height: number; fill: string }>;
}

interface VisitorTypeCardProps {
    visitorTypes: VisitorType[];
    onTypePress?: (typeId: string) => void;
}

export const VisitorTypeCard = ({ visitorTypes, onTypePress }: VisitorTypeCardProps) => {
    return (
        <View
            className="w-[331px] md:w-full h-[254px] md:h-auto bg-white rounded-[20px] p-5 flex-row flex-wrap md:flex-nowrap gap-x-[15px] gap-y-[20px] md:justify-around shadow-sm shadow-black/25 android:elevation-5"
        >
            {visitorTypes.map((item) => (
                <Pressable
                    key={item.id}
                    className="items-center w-[85px]"
                    onPress={() => onTypePress?.(item.id)}
                >
                    <View className="w-[56.52px] h-[56.52px] bg-primary rounded-[11.56px] items-center justify-center">
                        <item.icon width={24} height={24} fill="white" />
                    </View>
                    <Text className="font-inter mt-2 font-medium text-[14px] leading-[27px] tracking-[-0.41px] text-text-secondary">
                        {item.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};
