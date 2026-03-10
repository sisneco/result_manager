import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useLogin } from '../../../hooks/useLogin';
import { loginSchema } from '../../../utils/validations';
import { MOCK_COMPETITIONS } from '../api/mockData';

export function LoginForm() {
    const router = useRouter();
    const { mutate: loginMutation, isPending } = useLogin();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [competition, setCompetition] = useState(MOCK_COMPETITIONS[0].name);

    const [errors, setErrors] = useState<{ login_id?: string; password?: string; competition_name?: string }>({});

    const handleLogin = () => {
        setErrors({});

        const result = loginSchema.safeParse({
            login_id: loginId,
            password: password,
            competition_name: competition,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                login_id: fieldErrors.login_id?.[0],
                password: fieldErrors.password?.[0],
                competition_name: fieldErrors.competition_name?.[0],
            });
            return;
        }

        loginMutation(result.data, {
            onSuccess: () => {
                router.replace('/games');
            },
            onError: (err: any) => {
                const msg = err.response?.data?.message || 'ログインに失敗しました';
                alert(msg);
            }
        });
    };

    return (
        <View className="bg-white dark:bg-zinc-800 rounded-3xl px-6 py-8 shadow-sm">
            {/* タイトル */}
            <Text className="text-2xl font-extrabold tracking-wide text-center text-zinc-900 dark:text-zinc-50 mb-5">
                Result Manager
            </Text>

            {/* ログインID */}
            <View className="mb-1">
                <Text className="text-xs font-bold tracking-wider uppercase mb-1 text-zinc-500 dark:text-zinc-400">Login ID</Text>
                <TextInput
                    className={`bg-zinc-100 dark:bg-zinc-700 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100
            ${errors.login_id ? 'border border-red-500' : ''}`}
                    placeholder="Enter your ID"
                    placeholderTextColor="#9ca3af"
                    value={loginId}
                    onChangeText={setLoginId}
                    autoCapitalize="none"
                />
                <View className="h-4 mt-0.5 justify-center">
                    {errors.login_id && <Text className="text-red-500 text-xs font-medium">{errors.login_id}</Text>}
                </View>
            </View>

            {/* パスワード */}
            <View className="mb-1">
                <Text className="text-xs font-bold tracking-wider uppercase mb-1 text-zinc-500 dark:text-zinc-400">Password</Text>
                <TextInput
                    className={`bg-zinc-100 dark:bg-zinc-700 rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100
            ${errors.password ? 'border border-red-500' : ''}`}
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View className="h-4 mt-0.5 justify-center">
                    {errors.password && <Text className="text-red-500 text-xs font-medium">{errors.password}</Text>}
                </View>
            </View>

            {/* 競技名選択 */}
            <View className="mb-4">
                <Text className="text-xs font-bold tracking-wider uppercase mb-1 text-zinc-500 dark:text-zinc-400">Competition</Text>
                <View className="bg-zinc-100 dark:bg-zinc-700 rounded-xl overflow-hidden">
                    <Picker
                        selectedValue={competition}
                        onValueChange={(itemValue) => setCompetition(itemValue)}
                        style={{ color: '#18181b', backgroundColor: 'transparent', height: 42, paddingHorizontal: 16 }}
                        itemStyle={{ fontSize: 14, fontWeight: '500' }}
                    >
                        {MOCK_COMPETITIONS.map(comp => (
                            <Picker.Item key={comp.id} label={comp.name} value={comp.name} />
                        ))}
                    </Picker>
                </View>
                <View className="h-4 mt-0.5 justify-center">
                    {errors.competition_name && <Text className="text-red-500 text-xs font-medium">{errors.competition_name}</Text>}
                </View>
            </View>

            {/* ログインボタン */}
            <TouchableOpacity
                className={`bg-zinc-900 dark:bg-zinc-100 rounded-xl py-3 flex-row justify-center items-center active:opacity-80
          ${isPending ? 'opacity-50' : ''}`}
                onPress={handleLogin}
                disabled={isPending}
            >
                {isPending ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white dark:text-zinc-900 text-base font-bold tracking-wide">Sign In</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
