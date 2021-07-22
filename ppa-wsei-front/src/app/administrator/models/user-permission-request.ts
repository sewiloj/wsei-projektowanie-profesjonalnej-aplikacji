import { UserType } from 'src/app/login/models/user-type';

/**
 * Request for the user type.
 */
export interface UserPermissionRequest {
  /**
   * Unique request id.
   */
  id: number;
  /**
   * User name.
   */
  name: string;
  /**
   * Requested permission.
   */
  type: UserType;
  /**
   * Message written by the user to the administrator.
   */
  message: string;
}
