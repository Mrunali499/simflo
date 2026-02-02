import { Button, Input } from '@/components/core';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { api, useMutation } from 'simflo-backend/client';
import { useAuth } from './_layout';
import { router } from 'expo-router';

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    
    const { signIn } = useAuth()!;
    const { mutate: login, isLoading: isLoginLoading } = useMutation(api.core.auth.login);
    const { mutate: register, isLoading: isRegisterLoading } = useMutation(api.core.auth.register);

    const handleSubmit = async () => {
        if (!mobile || !password) {
            Alert.alert('Error', 'Please enter mobile number and password');
            return;
        }

        const payload = { phoneNumber: mobile, password };
        const action = isRegister ? register : login;

        try {
            const result = await action(payload) as any;
            if (result && result.token && result.user) {
                await signIn(result.token, result.user.id);
            }
        // Navigate to the conversation list page
        router.replace('/conversation');

        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
            <View className="flex-1 px-6 justify-center space-y-8">
                <View className="space-y-2">
                    <Text className="text-2xl font-bold text-black">
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </Text>
                    <Text className="text-gray-500">
                        {isRegister ? 'Enter details to register' : 'Please enter your details to login'}
                    </Text>
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

                <View className="pt-4 space-y-4">
                    <Button 
                        title={isRegister ? "Register" : "Login"} 
                        onPress={handleSubmit}
                        disabled={isLoginLoading || isRegisterLoading}
                    />
                    
                    <TouchableOpacity onPress={() => setIsRegister(!isRegister)} className="items-center">
                        <Text className="text-primary font-medium">
                            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
