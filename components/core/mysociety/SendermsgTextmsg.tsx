import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface SendermsgTextmsgProps {
    message: string;
    timestamp: Date;
}

export const SendermsgTextmsg = ({ message, timestamp }: SendermsgTextmsgProps) => {
    const [timeString, setTimeString] = useState('Just now');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

            if (diffInSeconds < 60) {
                setTimeString('Just now');
            } else if (diffInSeconds < 3600) {
                const minutes = Math.floor(diffInSeconds / 60);
                setTimeString(`${minutes} min${minutes > 1 ? 's' : ''} ago`);
            } else if (diffInSeconds < 86400) {
                const hours = Math.floor(diffInSeconds / 3600);
                setTimeString(`${hours} hour${hours > 1 ? 's' : ''} ago`);
            } else {
                setTimeString(timestamp.toLocaleDateString());
            }
        };

        updateTime(); // Initial call
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [timestamp]);

    return (
        <View className="flex-row items-start gap-3 self-end">
            {/* Message Bubble */}
            <View className="flex-col gap-1 items-end shrink">
                <View
                    className="max-w-[302px] min-h-[63px] bg-primary rounded-tl-[13px] rounded-bl-[13px] rounded-br-[13px] rounded-tr-none p-4 justify-center self-end"
                >
                    <Text className="font-medium text-[14px] leading-[21px] tracking-[-0.32px] text-white">{message}</Text>
                </View>
                <Text className="font-medium text-[11px] leading-[21px] tracking-[-0.32px] text-xs text-text-secondary mr-1">{timeString}</Text>
            </View>
        </View>
    );
};
