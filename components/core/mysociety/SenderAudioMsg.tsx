import { Audio } from 'expo-av';
import { Pause, Play } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SenderAudioMsgProps {
    audioUri: string;
    timestamp: Date;
}

export const SenderAudioMsg = ({ audioUri, timestamp }: SenderAudioMsgProps) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
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
            } else {
                setTimeString(timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => {
            clearInterval(interval);
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [timestamp, sound]);

    const playPauseSound = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: audioUri },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
            setSound(newSound);
            setIsPlaying(true);
        }
    };

    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            if (status.didJustFinish) {
                setIsPlaying(false);
                setPosition(0);
            }
        }
    };

    const formatTime = (millis: number) => {
        const totalSeconds = millis / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressWidth = duration > 0 ? (position / duration) * 100 : 0;

    return (
        <View className="flex-row items-start gap-3 self-end mb-4">
            <View className="flex-col gap-1 items-end shrink">
                <View
                    className="w-[250px] bg-primary rounded-tl-[13px] rounded-bl-[13px] rounded-br-[13px] rounded-tr-none p-3 justify-center self-end"
                >
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={playPauseSound}
                            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        >
                            {isPlaying ? <Pause size={20} color="white" fill="white" /> : <Play size={20} color="white" fill="white" />}
                        </TouchableOpacity>

                        <View className="flex-1 flex-col gap-1">
                            <View className="h-1 bg-white/30 rounded-full w-full overflow-hidden">
                                <View
                                    style={{ width: `${progressWidth}%` }}
                                    className="h-full bg-white"
                                />
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-[10px] text-white/80 font-inter">
                                    {formatTime(position)}
                                </Text>
                                <Text className="text-[10px] text-white/80 font-inter">
                                    {formatTime(duration)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text className="font-medium text-[11px] text-text-secondary mr-1">{timeString}</Text>
            </View>
        </View>
    );
};
