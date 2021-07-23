import { UserType } from './../../../login/models/user-type';
import { GenericResponse } from './../../../common/models/api/generic-response';
import { UserPermissionRequestStatus } from '../user-permission-request-status';

/**
 * Model for the response from api/administrator/requests.
 */
export interface GetRequestPermissionsResponse extends GenericResponse {
  requests: RequestPermission[];
}

/**
 * Permissions taken from the api/administrator/requests.
 */
export interface RequestPermission {
  id: number;
  user_id: number;
  name: string;
  permission: UserType;
  message: string;
  accepted: UserPermissionRequestStatus;
  created_at: string;
  updated_at: string;
}
