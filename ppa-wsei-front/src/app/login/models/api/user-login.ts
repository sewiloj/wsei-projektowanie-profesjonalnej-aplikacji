/**
 * Model for /api/login endpoint request.
 */
export interface UserLoginRequest {
  email: string;
  password: string;
}

/**
 * Model for /api/login endpoint response.
 */
export interface UserLoginResponse {
  success: 'success' | 'error';
  api_token: string;
  user_id: number;
  name: string;
}
