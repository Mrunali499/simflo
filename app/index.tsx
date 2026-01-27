import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text className="text-2xl font-bold mb-6">Home Page</Text>
            <Button className="mb-4">
                <Text>Create Task</Text>
            </Button>
            <Link href="/about" asChild>
                <Button variant="outline">
                    <Text>Go to About</Text>
                </Button>
            </Link>
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
