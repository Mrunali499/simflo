import { BottomTabNavigation, Button as CoreButton, DateSelection, Dropdown, Input, VisitorTypeCard } from '@/components/core';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function ComponentShowcase() {
    const [visitPurpose, setVisitPurpose] = useState('');
    const [email, setEmail] = useState('');
    const [serviceType, setServiceType] = useState('');

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="p-4 space-y-6 pb-32">
                    <View className="space-y-4">
                        <Text variant="h2" className="font-medium text-gray-800">Input Components</Text>

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

                    {/* --- Section: Dropdown --- */}
                    <View className="space-y-4">
                        <Text variant="h2">Dropdown Component</Text>
                        <Dropdown
                            label="Service Type"
                            options={[
                                { label: 'Plumbing', value: 'plumbing' },
                                { label: 'Electrical', value: 'electrical' },
                                { label: 'Cleaning', value: 'cleaning' },
                            ]}
                            value={serviceType}
                            onSelect={setServiceType}
                        />
                    </View>

                    {/* --- Section 3: Visitor Card --- */}
                    <View className="space-y-4">
                        <Text variant="h2" className="font-medium text-gray-800">Visitor Selection</Text>
                        <View className="items-center">
                            <VisitorTypeCard />
                        </View>
                    </View>

                    {/* --- Section: Date Selection --- */}
                    <DateSelection />

                    {/* --- Section 4: Core Button --- */}
                    <View className="space-y-4">
                        <Text variant="h2" className="font-medium text-gray-800">Core Button</Text>
                        <View>
                            <CoreButton title="Continue" onPress={() => console.log('Pressed')} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomTabNavigation />
        </View>
    );
}
