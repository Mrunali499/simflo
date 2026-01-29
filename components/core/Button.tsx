import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

interface ButtonProps extends PressableProps {
    title: string;
    containerClassName?: string;
    textClassName?: string;
}

export const Button = React.forwardRef<View, ButtonProps>(
    ({ title, containerClassName = '', textClassName = '', ...props }, ref) => {
        return (
            <Pressable
                ref={ref}
                className={`w-full h-[53px] bg-primary border border-border-default rounded-[9px] items-center justify-center active:opacity-90 ${containerClassName}`}
                {...props}
            >
                <Text className={`font-inter text-white font-medium text-[14px] leading-[21px] tracking-[-0.32px] ${textClassName}`}>
                    {title}
                </Text>
            </Pressable>
        );
    }
);

Button.displayName = 'CoreButton';
