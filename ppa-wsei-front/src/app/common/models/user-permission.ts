import { UserType } from './../../login/models/user-type';

/**
 * Visualizations of the user types.
 */
export interface UserPermission {
  label: string;
  type: UserType;
}

/**
 * Selectable user permissions.
 */
export const USER_PERMISSIONS: UserPermission[] = [
  {
    label: 'Permissions.Administrator',
    type: UserType.Administrator,
  },
  {
    label: 'Permissions.Courier',
    type: UserType.Courier,
  },
  {
    label: 'Permissions.Supplier',
    type: UserType.Supplier,
  },
  {
    label: 'Permissions.HospitalWorker',
    type: UserType.HospitalWorker,
  },
];
