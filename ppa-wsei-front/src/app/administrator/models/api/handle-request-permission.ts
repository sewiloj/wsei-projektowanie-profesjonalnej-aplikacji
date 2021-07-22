/**
 * Model for /api/administartor/handleRequest
 */
export interface HandleRequestPermissionRequest {
  /**
   * Whether the administrator accepted the request.
   */
  is_accepted: boolean;
  /**
   * Unique ID of the permission.
   */
  permission_id: number;
}
