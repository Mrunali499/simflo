import { ConversationHeader, ConversationList, FilterList, ToggleSwitch } from '@/components/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export const FeaturePage = () => {
    const [selectedFilter, setSelectedFilter] = useState('My Clinic');
    const [isOpdMode, setIsOpdMode] = useState(false);

    const patientData = Array.from({ length: 5 }, (_, i) => ({
        name: `Patient ${i + 1}`,
        message: 'Checked in for checkup',
        time: 'Now',
        unreadCount: 0
    }));

    const normalData = Array(5).fill({
        name: 'Mathew Keith',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '10 min',
        unreadCount: 2
    });

    return (
        <View className="flex-1 bg-white">
            <ConversationHeader
                title="Features"
                headerRight={
                    selectedFilter === 'My Clinic' ? (
                        <ToggleSwitch
                            checked={isOpdMode}
                            onCheckedChange={setIsOpdMode}
                        />
                    ) : undefined
                }
            />

            <FilterList
                filters={['All', 'My Society', "My Company", 'My Clinic',]}
                selectedFilter={selectedFilter}
                onSelect={setSelectedFilter}
            />

            {selectedFilter === 'My Clinic' && (
                <ConversationList
                    data={isOpdMode ? patientData : normalData}
                    onItemPress={() => { }}
                />
            )}
        </View>
    );
};
