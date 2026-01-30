import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import React from 'react';
import { Platform } from 'react-native';

interface ToggleSwitchProps {
    className?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export const ToggleSwitch = ({ className, checked = false, onCheckedChange = () => { } }: ToggleSwitchProps) => {
    return (
        <SwitchPrimitives.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={cn(
                'flex h-[1.15rem] w-8 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5',
                Platform.select({
                    web: 'focus-visible:border-ring focus-visible:ring-ring/50 peer inline-flex outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
                }),
                checked ? 'bg-primary' : 'bg-icon-inactive',
                className
            )}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    'size-4 rounded-full transition-transform shadow-sm',
                    Platform.select({
                        web: 'pointer-events-none block ring-0',
                    }),
                    checked
                        ? 'bg-white translate-x-3.5'
                        : 'bg-transparent translate-x-0'
                )}
            />
        </SwitchPrimitives.Root>
    );
};
