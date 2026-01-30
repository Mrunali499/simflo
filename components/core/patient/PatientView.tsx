import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Activity, Mic, Square } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const SIMULATED_TEXT = "I have been feeling a mild fever since yesterday evening, accompanied by a headache and some fatigue. I took a paracetamol last night but the fever persists.";

export const PatientView = ({ onComplete }: { onComplete?: () => void }) => {
    const [step, setStep] = useState<'START' | 'NAME' | 'RECORDING' | 'SUCCESS'>('START');
    const [patientName, setPatientName] = useState('');
    const [transcribedText, setTranscribedText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const textIndexRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (step === 'SUCCESS' && onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, onComplete]);

    const handleStartRecording = () => {
        if (!patientName.trim()) return;
        setStep('RECORDING');
        setIsRecording(true);
        textIndexRef.current = 0;
        setTranscribedText('');

        intervalRef.current = setInterval(() => {
            if (textIndexRef.current < SIMULATED_TEXT.length) {
                setTranscribedText((prev) => prev + SIMULATED_TEXT.charAt(textIndexRef.current));
                textIndexRef.current++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        }, 50);
    };

    const handleStopRecording = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRecording(false);
        setStep('SUCCESS');
    };

    if (step === 'START') {
        return (
            <View className="bg-white rounded-[13px] border border-border-subtle shadow-custom-card mx-4 my-2 p-5">
                <View className="flex-row items-center gap-3 mb-4">
                    <View className="w-10 h-10 bg-[var(--plus-active-bg)] rounded-full items-center justify-center">
                        <Icon as={Activity} className="text-primary" size={20} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-text-header font-inter">Symptom Reporting</Text>
                        <Text className="text-[12px] text-text-secondary font-inter">Record and share your health updates</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => setStep('NAME')}
                    className="bg-primary w-full py-3 rounded-xl items-center shadow-sm"
                >
                    <Text className="text-white font-semibold text-sm font-inter">Provide Symptoms</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (step === 'NAME') {
        return (
            <View className="bg-white rounded-[13px] border border-border-subtle shadow-custom-card mx-4 my-2 p-5">
                <Text className="text-lg font-bold text-text-header mb-4 text-center font-inter">
                    Patient Details
                </Text>

                <View className="gap-4">
                    <View>
                        <Text className="text-[12px] font-medium text-text-secondary mb-1.5 font-inter">
                            Patient Name
                        </Text>
                        <Input
                            placeholder="Enter full name"
                            value={patientName}
                            onChangeText={setPatientName}
                            className="bg-white h-11"
                        />
                    </View>

                    <Button
                        onPress={handleStartRecording}
                        className="w-full mt-2 rounded-xl bg-primary"
                        disabled={!patientName.trim()}
                    >
                        <Text className="text-white font-medium font-inter">Start Recording</Text>
                    </Button>
                </View>
            </View>
        );
    }

    if (step === 'RECORDING') {
        return (
            <View className="bg-white rounded-[13px] border border-border-subtle shadow-custom-card mx-4 my-2 p-5">
                <Text className="text-lg font-semibold text-text-header mb-4 text-center font-inter">
                    Listening...
                </Text>

                <View className="min-h-[120px] bg-[var(--bg-card-neutral)] rounded-xl p-4 mb-6 border border-border-subtle">
                    <Text className="text-text-primary text-sm leading-6 font-inter">
                        {transcribedText}
                        <Text className="text-primary">|</Text>
                    </Text>
                </View>

                <View className="items-center gap-4">
                    <View className="w-14 h-14 bg-red-50 rounded-full items-center justify-center animate-pulse border border-red-100">
                        <Mic size={24} className="text-red-500" />
                    </View>

                    <Button
                        onPress={handleStopRecording}
                        className="bg-red-500 px-6 h-10 rounded-full flex-row gap-2 items-center"
                    >
                        <Square size={12} color="white" fill="white" />
                        <Text className="text-white font-medium text-xs font-inter">Stop Recording</Text>
                    </Button>
                </View>
            </View>
        );
    }

    if (step === 'SUCCESS') {
        return (
            <View className="bg-white rounded-[13px] border border-border-subtle shadow-custom-card mx-4 my-2 p-6 items-center">
                <View className="w-12 h-12 bg-[var(--bg-icon-circle)] rounded-full items-center justify-center mb-3">
                    <Icon as={Activity} className="text-status-upcoming" size={24} />
                </View>

                <Text className="text-xl font-bold text-text-header mb-2 text-center font-inter">
                    Thank You
                </Text>

                <Text className="text-sm font-medium text-text-primary mb-4 text-center font-inter">
                    {patientName}
                </Text>

                <View className="bg-[var(--bg-card-neutral)] p-3 rounded-lg w-full mb-6">
                    <Text className="text-xs text-text-secondary text-center leading-5 font-inter">
                        Your input has been successfully shared with <Text className="font-semibold text-text-header">Dr. Smith</Text>
                    </Text>
                </View>


            </View>
        );
    }

    return null;
};
