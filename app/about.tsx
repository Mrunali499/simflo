import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function AboutPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text className="text-2xl font-bold mb-4">About Page</Text>
            <Text className="text-base text-center mb-6">
                This is an example page showing how to use Expo Router for navigation.
            </Text>
            <Button variant="outline" onPress={() => router.back()}>
                <Text>Go Back</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        padding: 20,
    },
});
