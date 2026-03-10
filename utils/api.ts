import axios from 'axios';

// 基本となるAPIクライアント
export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// モックを有効にする場合（現在はフロントエンド単体のため常に有効）
// 開発環境と本番環境で切り替える場合は環境変数 (EXPO_PUBLIC_USE_MOCK) などを用います
if (process.env.NODE_ENV !== 'production') {
    require('../mock/server');
}
