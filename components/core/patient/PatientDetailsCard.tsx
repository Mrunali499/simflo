import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ClipboardList, FileText, Mic, Play, Plus, Search, Stethoscope } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { PrescriptionUpload } from './PrescriptionUpload';

interface Medicine {
    id: string;
    name: string;
    dosage: string;
    taken: boolean;
}

export const PatientDetailsCard = ({ patientName = "Rohan Sharma" }: { patientName?: string }) => {
    const [medicines, setMedicines] = useState<Medicine[]>([
        { id: '1', name: 'Paracetamol', dosage: '500mg', taken: true },
        { id: '2', name: 'Amoxicillin', dosage: '250mg', taken: true },
    ]);
    const [isUploadVisible, setIsUploadVisible] = useState(false);

    const toggleMedicine = (id: string) => {
        setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
    };

    const handlePrescriptionSubmit = () => {
        // Handle submission logic here
        setIsUploadVisible(false);
    };

    const handleOpenUpload = () => {
        setIsUploadVisible(true);
    };

    return (
        <View className="w-[272px] bg-white rounded-[13px] self-end shadow-custom-card mb-4 border border-border-guest z-10">
            {/* Header */}
            <View className="w-full h-[47px] bg-[--visit-type-active-bg] rounded-t-[13px] flex-row items-center justify-between px-4">
                <Text className="font-bold text-[15px] text-black tracking-widest font-inter flex-1 mr-2" numberOfLines={1}>{patientName}</Text>
                <View className="bg-[--status-upcoming] rounded-[17px] px-2 py-0.5 items-center justify-center">
                    <Text className="text-[10px] font-medium text-white font-inter">My Details</Text>
                </View>
            </View>

            {/* Content */}
            <View className="p-4 pt-[11px] z-20">
                <Text className="text-[10px] text-text-secondary font-inter mb-3">Friday, Jan 30, 2026-30, 4:23 PM</Text>

                {/* Audio Section */}
                <View className="bg-[--bg-card-neutral] rounded-[10px] p-2 mb-3">
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-[31px] h-[31px] bg-[#F0F2FC] rounded-[5px] items-center justify-center">
                            <Icon as={Mic} className="text-primary" size={18} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[8px] text-[#A1A1A1] font-medium font-inter">Recorded Audio</Text>
                            <Text className="text-[10px] font-semibold text-[#111111] font-inter" numberOfLines={1}>Consultation - 2026-01-30</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity className="flex-row items-center gap-1.5">
                            <View className="w-[31px] h-[31px] bg-white border border-primary rounded-full items-center justify-center">
                                <Icon as={Play} className="text-primary fill-primary" size={14} />
                            </View>
                            <Text className="text-[10px] font-medium text-text-header font-inter">Play</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Medicine Section */}
                <View className="mb-3">
                    <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center gap-2">
                            <View className="w-[31px] h-[31px] bg-[#F0F2FC] rounded-[5px] items-center justify-center">
                                <Icon as={Stethoscope} className="text-primary" size={18} />
                            </View>
                            <Text className="text-[12px] font-bold text-text-header font-inter">Medicine</Text>
                        </View>
                    </View>

                    <View className="gap-2 pl-1">
                        {medicines.map((med) => (
                            <View key={med.id} className="flex-row items-start justify-between">
                                <View className="flex-1 mr-1">
                                    <Text className="text-[11px] font-medium text-text-header font-inter">{med.name}</Text>
                                    <Text className="text-[10px] text-text-secondary font-inter">({med.dosage})</Text>
                                </View>
                            </View>
                        ))}
                    </View>


                </View>

                <View className="h-[1px] bg-border-subtle mb-3" />

                {/* Diagnosis Section */}
                <View className="z-30">
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-[31px] h-[31px] bg-[#F0F2FC] rounded-[5px] items-center justify-center">
                            <Icon as={ClipboardList} className="text-primary" size={18} />
                        </View>
                        <Text className="text-[12px] font-bold text-text-header font-inter">Diagnosis</Text>
                    </View>
                    <View className="pl-[39px]">
                        <Text className="text-[11px] text-text-header font-inter mb-2">Common Cold, Mild Fever</Text>
                        <View className="flex-row items-center justify-between mt-2 pr-2">
                            <View className="items-center gap-1 relative z-40">
                                <TouchableOpacity
                                    className="w-[30px] h-[30px] bg-primary rounded-full items-center justify-center"
                                    onPress={handleOpenUpload}
                                >
                                    <Icon as={Plus} className="text-white" size={16} />
                                </TouchableOpacity>
                                <Text className="text-[8px] text-text-secondary font-medium font-inter">Add Prescription</Text>
                            </View>

                            <TouchableOpacity className="items-center gap-1">
                                <View className="w-[30px] h-[30px] bg-white border border-primary rounded-full items-center justify-center">
                                    <Icon as={FileText} className="text-primary" size={16} />
                                </View>
                                <Text className="text-[8px] text-text-secondary font-inter">Transcript</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="items-center gap-1">
                                <View className="w-[30px] h-[30px] bg-white border border-primary rounded-full items-center justify-center">
                                    <Icon as={Search} className="text-primary" size={16} />
                                </View>
                                <Text className="text-[8px] text-text-secondary font-inter">Analysis</Text>
                            </TouchableOpacity>
                        </View>
                        <Button className="bg-primary rounded-full h-[28px] px-3 flex-row gap-1 self-start mt-3">
                            <Text className="text-[10px] text-white font-medium font-inter">Mark as Done</Text>
                        </Button>
                    </View>
                </View>

            </View>

            {/* Upload Modal */}
            <Modal
                transparent={true}
                visible={isUploadVisible}
                onRequestClose={() => setIsUploadVisible(false)}
                animationType="fade"
            >
                <TouchableOpacity
                    className="flex-1 bg-black/50 justify-center items-center"
                    activeOpacity={1}
                    onPress={() => setIsUploadVisible(false)}
                >
                    {/* Stop propagation of press to prevent closing when clicking inside content */}
                    <TouchableOpacity activeOpacity={1}>
                        <PrescriptionUpload
                            onSubmit={handlePrescriptionSubmit}
                            onCancel={() => setIsUploadVisible(false)}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};
