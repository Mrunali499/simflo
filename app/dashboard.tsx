import { BottomTabNavigation, ChatListItem, Button as CoreButton, DateSelection, Dropdown, FilterChip, Input, Textmsg, VisitorTypeCard, VisitType } from '@/components/core';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { MoreVertical } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function ComponentShowcase() {
    const [visitPurpose, setVisitPurpose] = useState('');
    const [email, setEmail] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

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

                    {/* --- Section: Visit Type --- */}
                    <View className="space-y-4">
                        <VisitType />
                    </View>

                    {/* --- Section: Filter Chips --- */}
                    <View className="space-y-4">
                        <Text variant="h2" className="font-medium text-gray-800">Filter Chips</Text>

                        {/* Mobile: Horizontal Scroll */}
                        <View className="flex md:hidden flex-row items-center">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow" contentContainerStyle={{ gap: 8, paddingRight: 16 }}>
                                {['All', 'Favorite', 'Unread', 'Groups', 'My Society'].map((filter) => (
                                    <FilterChip
                                        key={filter}
                                        label={filter}
                                        selected={selectedFilter === filter}
                                        onPress={() => setSelectedFilter(filter)}
                                    />
                                ))}
                            </ScrollView>
                            <View className="pl-2">
                                <Icon as={MoreVertical} className="text-gray-500" size={20} />
                            </View>
                        </View>

                        {/* Desktop/Tablet: Wrap */}
                        <View className="hidden md:flex flex-row flex-wrap gap-2">
                            {['All', 'Favorite', 'Unread', 'Groups', 'My Society'].map((filter) => (
                                <FilterChip
                                    key={filter}
                                    label={filter}
                                    selected={selectedFilter === filter}
                                    onPress={() => setSelectedFilter(filter)}
                                />
                            ))}
                            <View className="pl-2 justify-center">
                                <Icon as={MoreVertical} className="text-gray-500" size={20} />
                            </View>
                        </View>
                    </View>

                    {/* --- Section: Chat List Item --- */}
                    <View className="space-y-4">
                        <Text variant="h2" className="font-medium text-gray-800">Chat List Item</Text>
                        <ChatListItem />
                    </View>

                    {/* --- Section: Date Selection --- */}
                    <DateSelection />

                    {/* --- Section: Text Message --- */}
                    <View className="space-y-4">
                        <Text variant="h2" className="font-medium text-gray-800">Text Message</Text>
                        <Textmsg
                            message="Hello! I am at the gate."
                            timestamp={new Date()}
                        />
                        <Textmsg
                            message="Can you approve the entry?"
                            timestamp={new Date(Date.now() - 120000)} // 2 mins ago
                        />
                    </View>

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
