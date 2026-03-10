import { View } from 'react-native';
import { Stack } from 'expo-router';
import { LoginForm } from '../features/auth/components/LoginForm';

export default function LoginScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900 px-6">
            <Stack.Screen options={{ headerShown: false }} />
            <View className="w-full max-w-sm flex-none self-center">
                <LoginForm />
            </View>
        </View>
    );
}
