/**
 * Model for /api/register endpoint request.
 */
export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 * Model for /api/register endpoint response.
 */
export interface UserRegisterResponse {
  success: 'success' | 'error';
  user: {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: string;
  };
}
