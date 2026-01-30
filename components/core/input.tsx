import { cn } from '@/lib/utils';
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
                        className={cn(
                            'font-inter font-semibold text-[13px] leading-[21px] tracking-[-0.32px] text-text-dark mb-[6px]',
                            labelClassName
                        )}
                    >
                        {label}
                    </Text>
                )}
                <TextInput
                    ref={ref}
                    className={cn(
                        'font-inter w-full h-[46px] bg-white border border-border-default rounded-[9px] px-4 font-medium text-[13px] leading-[21px] tracking-[-0.32px] text-text-dark placeholder:text-text-placeholder',
                        inputClassName
                    )}
                    {...props}
                />
                {error && (
                    <Text className="font-inter text-red-500 text-xs mt-1">{error}</Text>
                )}
            </View>
        );
    }
);

Input.displayName = 'Input';
