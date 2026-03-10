import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from '../../app/login';
import { mock } from '../../mock/server';

// expo-routerのモック化
jest.mock('expo-router', () => ({
    useRouter: () => ({
        replace: jest.fn(),
    }),
    Stack: {
        Screen: () => null,
    }
}));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
    },
});

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
    );
};

describe('LoginScreen', () => {
    beforeEach(() => {
        mock.resetHistory();
        queryClient.clear();
    });

    it('renders all fields correctly', () => {
        const { getByPlaceholderText, getByText } = renderWithProviders(<LoginScreen />);

        expect(getByPlaceholderText('Enter your ID')).toBeTruthy();
        expect(getByPlaceholderText('Enter your password')).toBeTruthy();
        expect(getByText('Sign In')).toBeTruthy();
    });

    it('shows validation errors for invalid input', async () => {
        const { getByText, getByPlaceholderText } = renderWithProviders(<LoginScreen />);

        // 不正なID(記号含む)によるバリデーションエラー
        fireEvent.changeText(getByPlaceholderText('Enter your ID'), 'invalid-id!');
        fireEvent.changeText(getByPlaceholderText('Enter your password'), '');

        fireEvent.press(getByText('Sign In'));

        await waitFor(() => {
            expect(getByText('ユーザーIDは半角英数字のみを入力してください')).toBeTruthy();
            expect(getByText('パスワードは必須です')).toBeTruthy();
        });
        expect(mock.history.post.length).toBe(0); // APIは呼ばれない
    });

    it('calls API and redirects on success', async () => {
        const mockRouter = require('expo-router').useRouter();
        const { getByText, getByPlaceholderText } = renderWithProviders(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('Enter your ID'), 'admin123');
        fireEvent.changeText(getByPlaceholderText('Enter your password'), 'secret');
        // 競技名コンポーネントの操作は仮にスキップ(初期値が設定される想定などのため)するかIDで対応

        fireEvent.press(getByText('Sign In'));

        await waitFor(() => {
            expect(mock.history.post.length).toBe(1); // APIが呼ばれる
            expect(mock.history.post[0].url).toBe('/api/login');
        });

        await waitFor(() => {
            expect(mockRouter.replace).toHaveBeenCalledWith('/games');
        });
    });
});
