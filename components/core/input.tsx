import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
    (
        {
            label,
            error,
            containerClassName = '',
            labelClassName = '',
            inputClassName = '',
            ...props
        },
        ref
    ) => {
        return (
            <View className={`mb-4 ${containerClassName}`}>
                {label && (
                    <Text
                        className={`font-semibold text-[13px] leading-[21px] tracking-[-0.32px] text-[#464646] mb-[6px] ${labelClassName}`}
                    >
                        {label}
                    </Text>
                )}
                <TextInput
                    ref={ref}
                    className={`w-[324px] h-[46px] bg-white border border-[#C6C6C6] rounded-[9px] px-4 font-medium text-[13px] leading-[21px] tracking-[-0.32px] text-[#464646] ${inputClassName}`}
                    placeholderTextColor="#BBBBBB"
                    {...props}
                />
                {error && (
                    <Text className="text-red-500 text-xs mt-1">{error}</Text>
                )}
            </View>
        );
    }
);

Input.displayName = 'Input';
