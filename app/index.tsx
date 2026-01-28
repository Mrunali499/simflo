import { Button, Input } from '@/components/core';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Login() {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Navigate to the index page (showcase/dashboard)
        router.replace('/dashboard');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
            <View className="flex-1 px-6 justify-center space-y-8">
                <View className="space-y-2">
                    <Text className="text-2xl font-bold text-black">Welcome Back</Text>
                    <Text className="text-gray-500">Please enter your details to login</Text>
                </View>

                <View className="space-y-4">
                    <Input
                        label="Mobile Number"
                        placeholder="Enter mobile number"
                        value={mobile}
                        onChangeText={setMobile}
                        keyboardType="phone-pad"
                        inputClassName="w-full"
                    />
                    <Input
                        label="Password"
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        inputClassName="w-full"
                    />
                </View>

                <View className="pt-4">
                    <Button title="Login" onPress={handleLogin} />

                </View>
            </View>
        </ScrollView>
    );
}
