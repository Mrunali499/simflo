import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

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
    const [visible, setVisible] = useState(false);
    const selectedOption = options.find((opt) => opt.value === value);

    const toggleDropdown = () => setVisible(!visible);

    const handleSelect = (val: string) => {
        onSelect(val);
        setVisible(false);
    };

    return (
        <View className={`w-full ${containerClassName}`}>
            {/* Label */}
            <Text className="font-inter font-semibold text-[13px] leading-[21px] tracking-[-0.32px] text-text-dark mb-[5px]">
                {label}
            </Text>

            {/* Trigger Button */}
            <Pressable
                onPress={toggleDropdown}
                className="w-full h-[46px] bg-white border border-border-default rounded-[9px] flex-row items-center justify-between px-[17px]"
            >
                <Text className={`font-inter font-medium text-[13px] leading-[21px] tracking-[-0.32px] ${selectedOption ? 'text-black' : 'text-black'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <ChevronDown size={20} color="var(--black)" />
            </Pressable>

            {/* Dropdown Modal */}
            {visible && (
                <Modal transparent animationType="fade" visible={visible} onRequestClose={() => setVisible(false)}>
                    <Pressable className="flex-1 bg-black/20" onPress={() => setVisible(false)}>
                        <View className="absolute left-[40px] right-[40px] top-[410px] bg-white rounded-[9px] border border-border-default p-2 shadow-lg">
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        className="p-3 border-b border-gray-100 last:border-0"
                                        onPress={() => handleSelect(item.value)}
                                    >
                                        <Text className="font-inter font-medium text-[13px] text-text-dark">{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};
