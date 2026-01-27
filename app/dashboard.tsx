import { BottomTabNavigation, Button as CoreButton, DateSelection, Input, VisitorTypeCard } from '@/components/core';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function ComponentShowcase() {
    const [visitPurpose, setVisitPurpose] = useState('');
    const [email, setEmail] = useState('');

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="p-4 space-y-8 pb-10">
                <View className="space-y-4">
                    <Text variant="h2">Input Components</Text>

                    <View className="space-y-2">
                        <Text className="text-gray-500 text-sm">Example 1: Basic Input</Text>
                        <Input
                            label="Purpose of visit"
                            placeholder="Enter visit purpose"
                            value={visitPurpose}
                            onChangeText={setVisitPurpose}
                        />
                    </View>

                    <View className="space-y-2">
                        <Text className="text-gray-500 text-sm">Example 2: Validation & Custom Style</Text>
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            error={email && !email.includes('@') ? 'Please enter a valid email' : undefined}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            inputClassName="w-full"
                        />
                    </View>
                </View>



                {/* --- Section 3: Visitor Card --- */}
                <View className="space-y-4">
                    <Text variant="h2">Visitor Selection</Text>
                    <View className="items-center">
                        <VisitorTypeCard />
                    </View>
                </View>

                {/* --- Section: Date Selection --- */}
                <DateSelection />

                {/* --- Section 4: Core Button --- */}
                <View className="space-y-4">
                    <Text variant="h2">Core Button</Text>
                    <View>
                        <CoreButton title="Continue" onPress={() => console.log('Pressed')} />
                    </View>
                </View>

                {/* --- Section 5: Bottom Navigation --- */}
                <View className="space-y-4">
                    <Text variant="h2">Bottom Navigation</Text>
                    <View className="items-center bg-gray-100 p-6 rounded-xl">
                        {/* Simulating a bottom anchored view container */}
                        <View className="w-full max-w-sm bg-white overflow-hidden shadow-lg rounded-b-2xl">

                            <BottomTabNavigation />
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}
