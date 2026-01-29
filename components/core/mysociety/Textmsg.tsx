import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface TextmsgProps {
    message: string;
    timestamp: Date;
}

export const Textmsg = ({ message, timestamp }: TextmsgProps) => {
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

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, [timestamp]);

    return (
        <View className="flex-row items-start gap-3 self-start">
            {/* Profile Icon */}
            <View className="w-[32px] h-[32px] rounded-full bg-primary items-center justify-center" />


            <View className="flex-col gap-1 items-start shrink">
                <View
                    className="max-w-[302px] min-h-[63px] bg-[#F2F2F2] rounded-tr-[13px] rounded-br-[13px] rounded-bl-[13px] rounded-tl-none p-4 justify-center self-start"
                >
                    <Text className="font-medium text-[14px] leading-[21px] tracking-[-0.32px]  text-text-dark">{message}</Text>
                </View>
                <Text className="font-medium text-[11px] leading-[21px] tracking-[-0.32px] text-text-secondary ml-1">{timeString}</Text>
            </View>
        </View>
    );
};
