import { UserType } from './user-type';

export interface User {
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
