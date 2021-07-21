import { UserType } from './../../login/models/user-type';

/**
 * Get the label of the user permission.
 * @param permission Type of the user permission.
 * @returns Label of the user permission.
 */
export function getPermissionName(permission: UserType): string {
  switch (permission) {
    case UserType.Administrator:
      return 'Administrator';
    case UserType.Courier:
      return 'Courier';
    case UserType.HospitalWorker:
      return 'Hospital Worker';
    case UserType.Supplier:
      return 'Supplier';
    case UserType.None:
    default:
      return 'No role';
  }
}
