/**
 * Status of the role permission requests.
 */
export enum UserPermissionRequestStatus {
  /**
   * Administrator didn't accept nor reject the request.
   */
  None = 0,
  /**
   * Administrator rejected the request.
   */
  Rejected = 1,
  /**
   * Administrator accepted the request.
   */
  Accepted = 2,
}
