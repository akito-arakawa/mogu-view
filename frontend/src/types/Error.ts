/*
* エラーメッセージ・バリデーションエラーメッセージ
*/

// エラーメッセージ
export interface ErrorResponse {
    message: string;
}

// バリデーションエラーメッセージ
export interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
}
