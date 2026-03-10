import { View } from 'react-native';
import { Stack } from 'expo-router';
import { LoginForm } from '../features/auth/components/LoginForm';

export default function LoginScreen() {
    return (
        <View className="flex-1 justify-center px-4 bg-white dark:bg-zinc-900">
            <Stack.Screen options={{ headerShown: false }} />
            {/* 画面内での最大幅と中央寄せの制御は親のコンテナで行う */}
            <View className="w-full max-w-md mx-auto">
                <LoginForm />
            </View>
        </View>
    );
}
