import { z } from 'zod';

// docs/validations.md [Login Request] に準拠したフロントエンド用スキーマ
export const loginSchema = z.object({
    login_id: z
        .string()
        .min(1, 'ユーザーIDは必須です')
        .regex(/^[a-zA-Z0-9]+$/, 'ユーザーIDは半角英数字のみを入力してください'),
    password: z
        .string()
        .min(1, 'パスワードは必須です'),
    competition_name: z
        .enum(['バスケットボール', 'バレーボール', 'ラグビー'], {
            errorMap: () => ({ message: '有効な競技名を選択してください' })
        }),
});

// Zodスキーマから型を抽出
export type LoginFormData = z.infer<typeof loginSchema>;
