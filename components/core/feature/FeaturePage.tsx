import { ConversationHeader, FilterList } from '@/components/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export const FeaturePage = () => {
    const [selectedFilter, setSelectedFilter] = useState('My Clinic');

    return (
        <View className="flex-1 bg-white">
            <ConversationHeader title="Features" />

            <FilterList
                filters={['All', 'My Clinic', 'My Society']}
                selectedFilter={selectedFilter}
                onSelect={setSelectedFilter}
            />

        </View>
    );
};
