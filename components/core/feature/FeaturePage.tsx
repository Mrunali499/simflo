import { ConversationHeader, ConversationList, FilterList, ToggleSwitch } from '@/components/core';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export const FeaturePage = () => {
    const [selectedFilter, setSelectedFilter] = useState('My Clinic');
    const [isOpdMode, setIsOpdMode] = useState(false);

    const COLORS = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500', 'bg-emerald-500', 'bg-blue-400'];

    const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

    const patientData = [
        { name: 'John Doe', message: 'Appointment booked for 10 AM', time: '5 min', unreadCount: 0 },
        { name: 'Jane Smith', message: 'Prescription renewal request', time: '1 hr', unreadCount: 1 },
        { name: 'Michael Johnson', message: 'Test results available', time: '3 hrs', unreadCount: 0 },
        { name: 'Emily Davis', message: 'Rescheduling visit', time: 'Yesterday', unreadCount: 2 },
        { name: 'Chris Evans', message: 'General inquiry', time: '2 days', unreadCount: 0 },
    ].map((user, index) => ({
        ...user,
        avatar: (
            <View className={`w-full h-full items-center justify-center ${COLORS[(index + 4) % COLORS.length]}`}>
                <Text className="font-inter font-bold text-white text-lg">{getInitials(user.name)}</Text>
            </View>
        )
    }));



    const normalData = [
        { name: 'Alice Walker', message: 'Can we reschedule?', time: '2 min', unreadCount: 1 },
        { name: 'Bob Martin', message: 'Thanks for the update.', time: '15 min', unreadCount: 0 },
        { name: 'Charlie Brown', message: 'Meeting confirmed.', time: '1 hr', unreadCount: 0 },
        { name: 'Diana Prince', message: 'Please send the report.', time: 'Yesterday', unreadCount: 3 },
        { name: 'Ethan Hunt', message: 'Mission accomplished.', time: '2 days', unreadCount: 0 },
        { name: 'Fiona Gallagher', message: 'Call me back.', time: '3 days', unreadCount: 0 },
        { name: 'George Lucas', message: 'May the force be with you.', time: '1 week', unreadCount: 0 },
        { name: 'Hannah Montana', message: 'Best of both worlds.', time: '2 weeks', unreadCount: 1 },
        { name: 'Ian Malcolm', message: 'Life finds a way.', time: '3 weeks', unreadCount: 0 },
        { name: 'Jack Sparrow', message: 'Why is the rum gone?', time: '1 month', unreadCount: 5 },
        { name: 'Katherine Johnson', message: 'Calculations are ready.', time: '1 month', unreadCount: 0 },
        { name: 'Liam Neeson', message: 'I will find you.', time: '2 months', unreadCount: 0 },
        { name: 'Monica Geller', message: 'I know!', time: '2 months', unreadCount: 2 },
        { name: 'Nathan Drake', message: 'Sic Parvis Magna.', time: '3 months', unreadCount: 0 },
        { name: 'Olivia Pope', message: 'It’s handled.', time: '3 months', unreadCount: 0 },
        { name: 'Peter Parker', message: 'With great power...', time: '4 months', unreadCount: 1 },
        { name: 'Quentin Tarantino', message: 'Directing a new film.', time: '5 months', unreadCount: 0 },
        { name: 'Rachel Green', message: 'We were on a break!', time: '6 months', unreadCount: 0 },
        { name: 'Steve Rogers', message: 'I can do this all day.', time: '1 year', unreadCount: 0 },
        { name: 'Tony Stark', message: 'I am Iron Man.', time: '1 year', unreadCount: 0 },
        { name: 'Bruce Wayne', message: 'I am Batman.', time: '1 year', unreadCount: 0 },
        { name: 'Clark Kent', message: 'Up, up and away!', time: '1 year', unreadCount: 0 },
    ].map((user, index) => ({
        ...user,
        avatar: (
            <View className={`w-full h-full items-center justify-center ${COLORS[index % COLORS.length]}`}>
                <Text className="font-inter font-bold text-white text-lg">{getInitials(user.name)}</Text>
            </View>
        )
    }));

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
                    onItemPress={(item) => {
                        if (isOpdMode) {
                            router.push({ pathname: '/patientchatwindow', params: { name: item.name } });
                        } else {
                            // Normal chat navigation if needed
                            router.push('/chatwindow');
                        }
                    }}
                />
            )}
        </View>
    );
};
