import MockAdapter from 'axios-mock-adapter';
import { api } from '../utils/api';

// カスタム遅延（ミリ秒）: 要件に従い設定値として外部管理またはここで調整可能にします
export const MOCK_CONFIG = {
    delay: 1000,
};

// モックアダプターの初期化
export const mock = new MockAdapter(api, { delayResponse: MOCK_CONFIG.delay });

// モックの遅延を動的に変更するためのユーティリティ
export const setMockDelay = (ms: number) => {
    // @ts-expect-error axios-mock-adapter typings missing delayResponse mutation
    mock.delayResponse = ms;
    console.log(`[Mock Server] Delay updated to ${ms}ms`);
};

// ============================================
// /api/login のモック定義
// ============================================
mock.onPost('/api/login').reply((config) => {
    try {
        const data = JSON.parse(config.data || '{}');
        const { login_id, password, competition_name } = data;

        // 簡単な必須パラメーターのチェックモック
        if (login_id && password && competition_name) {
            return [
                200,
                {
                    message: 'Login successful',
                    user: { id: 1, name: 'Record User', role: 'recorder' },
                    token: 'mock-jwt-token-12345',
                },
            ];
        }

        return [
            422,
            {
                message: 'The given data was invalid.',
                errors: {
                    login_id: !login_id ? ['login id field is required.'] : [],
                    password: !password ? ['password field is required.'] : [],
                    competition_name: !competition_name ? ['competition name is required.'] : [],
                },
            },
        ];
    } catch (e) {
        return [500, { message: 'Internal Server Error (Mock)' }];
    }
});

console.log(`[Mock Server] Enabled with ${MOCK_CONFIG.delay}ms default delay.`);
