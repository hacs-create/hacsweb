import { projectId as figmaProjectId, publicAnonKey as figmaAnonKey } from './supabase/info';

// 環境変数を安全に取得するヘルパー関数
const getEnv = (key: string) => {
  try {
    // import.meta.env が存在するか確認してからアクセス
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // エラーは無視してundefinedを返す
  }
  return undefined;
};

// 環境変数から設定を読み込み、なければFigma Make環境のデフォルト値を使用
// 本番環境（Vercel等）では環境変数を設定してください
export const SUPABASE_PROJECT_ID = getEnv('VITE_SUPABASE_PROJECT_ID') || figmaProjectId;
export const SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY') || figmaAnonKey;
export const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

// Edge Functionの名前
// デフォルトはFigma Make環境の関数名ですが、本番デプロイ時に変更可能です
export const EDGE_FUNCTION_NAME = getEnv('VITE_EDGE_FUNCTION_NAME') || 'make-server-27de0da4';
export const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/${EDGE_FUNCTION_NAME}`;
