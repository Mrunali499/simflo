import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import React from 'react';
import { Pressable, type ViewProps } from 'react-native';

interface FilterChipProps extends ViewProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    className?: string;
    textClassName?: string;
}

export function FilterChip({
    label,
    selected = false,
    onPress,
    className,
    textClassName,
    style,
    ...props
}: FilterChipProps) {
    return (
        <Pressable onPress={onPress} style={style} {...props}>
            <Badge
                variant={selected ? 'default' : 'secondary'}
                className={cn(
                    'rounded-full px-3 py-1 md:px-5 md:py-2',
                    !selected && 'bg-search-bg',
                    className
                )}
            >
                <Text
                    className={cn(
                        'font-medium text-xs md:text-sm',
                        selected ? 'text-white' : 'text-chip-text',
                        textClassName
                    )}
                >
                    {label}
                </Text>
            </Badge>
        </Pressable>
    );
}
