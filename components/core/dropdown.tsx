import DropdownArrow from '@/assets/images/dropdown-arrow.svg';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface DropdownProps {
    label: string;
    placeholder?: string;
    options: Array<{ label: string; value: string }>;
    value?: string;
    onSelect: (value: string) => void;
    containerClassName?: string;
}

export const Dropdown = ({
    label,
    placeholder = 'Select service type',
    options,
    value,
    onSelect,
    containerClassName = '',
}: DropdownProps) => {
    const [width, setWidth] = React.useState(0);
    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <View className={`w-full ${containerClassName}`}>
            {/* Label */}
            <Text className="font-semibold text-[13px] leading-[21px] tracking-[-0.32px] text-text-dark mb-[5px]">
                {label}
            </Text>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Pressable
                        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
                        className="w-full h-[46px] bg-white border border-border-default rounded-[9px] flex-row items-center justify-between px-[17px]"
                    >
                        <Text className={`font-medium text-[13px] leading-[21px] tracking-[-0.32px] ${selectedOption ? 'text-black' : 'text-black'}`}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </Text>
                        <DropdownArrow width={8} height={12} />
                    </Pressable>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    style={{ width }}
                    className="bg-white border border-border-default rounded-[9px] mt-1"
                >
                    {options.map((item) => (
                        <DropdownMenuItem key={item.value} onPress={() => onSelect(item.value)}>
                            <Text className="font-semibold text-[13px] leading-[21px] tracking-[-0.32px]  text-text-dark">{item.label}</Text>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </View>
    );
};