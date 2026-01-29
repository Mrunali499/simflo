import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface SenderImagemsgProps {
    imageUri: string;
    timestamp: Date;
}

export const SenderImagemsg = ({ imageUri, timestamp }: SenderImagemsgProps) => {
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
        <View className="flex-row items-start gap-3 self-end mb-4">
            <View className="flex-col gap-1 items-end shrink">
                <View
                    className="max-w-[302px] bg-primary rounded-tl-[13px] rounded-bl-[13px] rounded-br-[13px] rounded-tr-none p-1 justify-center self-end overflow-hidden"
                >
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: 250, height: 200, borderRadius: 10 }}
                        contentFit="cover"
                        transition={500}
                    />
                </View>
                <Text className="font-medium text-[11px] leading-[21px] tracking-[-0.32px] text-xs text-text-secondary mr-1">{timeString}</Text>
            </View>
        </View>
    );
};
