import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Upload } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface PrescriptionUploadProps {
    onSubmit: () => void;
    onCancel: () => void;
}

export const PrescriptionUpload = ({ onSubmit, onCancel }: PrescriptionUploadProps) => {
    return (
        <View className="bg-white rounded-[13px] p-3 shadow-custom-card border border-border-guest w-[200px]">
            {/* Header */}
            <Text className="text-[12px] font-bold text-text-header font-inter mb-3">Upload Prescription</Text>

            {/* Upload Area */}
            <TouchableOpacity className="w-full h-[88px] border border-dashed border-primary rounded-[8px] bg-[#F0F2FC] items-center justify-center mb-3">
                <View className="w-[32px] h-[32px] bg-white rounded-full items-center justify-center mb-1 shadow-sm">
                    <Upload size={16} className="text-primary" strokeWidth={2.5} />
                </View>
                <Text className="text-[8px] text-primary font-medium font-inter">Tap to upload</Text>
            </TouchableOpacity>

            {/* Actions */}
            <Button
                variant="default"
                size="sm"
                className="w-full h-[32px] rounded-full bg-primary"
                onPress={onSubmit}
            >
                <Text className="text-[10px] text-white font-bold font-inter">Submit</Text>
            </Button>
        </View>
    );
};
