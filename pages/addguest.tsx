import { ChatHeader } from '@/components/core/ChatHeader';
import { Textmsg } from '@/components/core/mysociety/Textmsg';
import { GuestForm } from '@/components/form/GuestForm';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function AddGuestPage() {
    return (
        <View className="flex-1 bg-white">
            <ChatHeader title="Add Guest" onClose={() => router.back()} />
            <ScrollView className="flex-1 p-4">
                <View className="pb-8">
                    <View className="mb-6">
                        <Textmsg
                            message="Please fill in the guest details below for quick entry."
                            timestamp={new Date()}
                        />
                    </View>
                    <View className="items-center mt-4">
                        <GuestForm />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
