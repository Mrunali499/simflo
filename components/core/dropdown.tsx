import { Portal } from '@rn-primitives/portal';
import { ChevronDown } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { LayoutRectangle, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface DropdownProps {
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
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<View>(null);
    const [layout, setLayout] = useState<LayoutRectangle | null>(null);
    const insets = useSafeAreaInsets();

    const selectedOption = options.find((opt) => opt.value === value);

    const toggleDropdown = () => {
        if (!isOpen && triggerRef.current) {
            triggerRef.current.measureInWindow((x, y, width, height) => {
                setLayout({ x, y, width, height });
                setIsOpen(true);
            });
        } else {
            setIsOpen(false);
        }
    };

    const handleSelect = (val: string) => {
        onSelect(val);
        setIsOpen(false);
    };

    return (
        <View className={`w-full z-50 ${containerClassName}`}>
            {/* Label */}
            <Text className="font-inter font-semibold text-[13px] leading-[21px] tracking-[-0.32px] text-text-dark mb-[5px]">
                {label}
            </Text>

            {/* Trigger Button */}
            <View
                ref={triggerRef}
                className="w-full"
                collapsable={false} // Important for measure
            >
                <Pressable
                    onPress={toggleDropdown}
                    className="w-full h-[46px] bg-white border border-border-default rounded-[9px] flex-row items-center justify-between px-[17px]"
                >
                    <Text
                        className={`font-inter font-medium text-[13px] leading-[21px] tracking-[-0.32px] ${selectedOption ? 'text-black' : 'text-text-placeholder'
                            }`}
                    >
                        {selectedOption ? selectedOption.label : placeholder}
                    </Text>
                    <ChevronDown size={20} color="var(--black)" />
                </Pressable>
            </View>

            {/* Portal Dropdown List */}
            {isOpen && layout && (
                <Portal name={`dropdown-${label}`}>
                    {/* Transparent Overlay to close on outside click */}
                    <Pressable
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        onPress={() => setIsOpen(false)}
                    />

                    {/* Absolute Positioned List */}
                    <View
                        style={{
                            position: 'absolute',
                            top: layout.y + layout.height + 6, // +6px gap
                            left: layout.x,
                            width: layout.width,
                            maxHeight: 200,
                            zIndex: 9999, // Ensure top of everything
                        }}
                        className="bg-white border border-border-default rounded-[9px] shadow-lg"
                    >
                        <ScrollView nestedScrollEnabled className="w-full">
                            {options.map((item) => (
                                <Pressable
                                    key={item.value}
                                    onPress={() => handleSelect(item.value)}
                                    // Use style for press feedback or keep standard
                                    className={`p-3 w-full rounded-[6px] my-[2px] ${item.value === value ? 'bg-visit-type-active-bg' : ''
                                        }`}
                                >
                                    <Text
                                        className={`font-inter font-medium text-[13px] ${item.value === value ? 'text-primary' : 'text-text-dark'
                                            }`}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Portal>
            )}
        </View>
    );
};
