import { UserType } from './user-type';

export interface User {
  /**
   * Unique user ID.
   */
  id: number;
  /**
   * Authorization token.
   */
  token: string;
  /**
   * User first name.
   */
  name: string;
  /**
   * What permissions this user has.
   */
  type: UserType;
}
