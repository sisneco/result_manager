import axios from 'axios';

// 基本となるAPIクライアント
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export { api };
