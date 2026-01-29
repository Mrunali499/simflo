import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react-native';
import React from 'react';
import { ScrollView, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface FilterChipProps extends TouchableOpacityProps {
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
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={style} {...props}>
            <Badge
                variant="outline"
                className={cn(
                    'rounded-full px-3 py-1 md:px-5 md:py-2 border-transparent',
                    selected ? 'bg-primary' : 'bg-search-bg',
                    className
                )}
            >
                <Text
                    className={cn(
                        'font-inter font-medium text-xs md:text-sm',
                        selected ? 'text-white' : 'text-chip-text',
                        textClassName
                    )}
                >
                    {label}
                </Text>
            </Badge>
        </TouchableOpacity>
    );
}

export function FilterOptionsButton({
    onPress,
    className,
    style,
    ...props
}: Omit<FilterChipProps, 'label'>) {
    return (
        <View className="pl-2">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={style}
                className={cn(
                    'bg-search-bg rounded-full w-[26px] h-[24px] justify-center items-center',
                    className
                )}
                {...props}
            >
                <Icon as={MoreVertical} className="text-gray-500" size={16} />
            </TouchableOpacity>
        </View>
    );
}

export function FilterList({
    selectedFilter = 'All',
    onSelect,
    onOptionsPress,
}: {
    selectedFilter?: string;
    onSelect?: (filter: string) => void;
    onOptionsPress?: () => void;
}) {
    const filters = ['All', 'Favorite', 'Unread', 'Groups', 'My Society'];

    return (
        <View className="flex-row items-center px-4 py-2">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingRight: 16 }}
                className="flex-1"
                keyboardShouldPersistTaps="always"
            >
                {filters.map((filter) => (
                    <FilterChip
                        key={filter}
                        label={filter}
                        selected={selectedFilter === filter}
                        onPress={() => onSelect?.(filter)}
                    />
                ))}
            </ScrollView>
            <FilterOptionsButton onPress={onOptionsPress} />
        </View>
    );
}
