import { ConversationHeader, FilterList, ToggleSwitch } from '@/components/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export const FeaturePage = () => {
    const [selectedFilter, setSelectedFilter] = useState('My Clinic');
    const [isReviewEnabled, setIsReviewEnabled] = useState(false);

    return (
        <View className="flex-1 bg-white">
            <ConversationHeader
                title="Features"
                headerRight={
                    selectedFilter === 'My Clinic' ? (
                        <ToggleSwitch
                            checked={isReviewEnabled}
                            onCheckedChange={setIsReviewEnabled}
                        />
                    ) : undefined
                }
            />

            <FilterList
                filters={['All', 'My Society', "My Company", 'My Clinic',]}
                selectedFilter={selectedFilter}
                onSelect={setSelectedFilter}
            />

        </View>
    );
};
