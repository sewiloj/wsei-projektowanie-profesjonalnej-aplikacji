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
    label: 'Administrator',
    type: UserType.Administrator,
  },
  {
    label: 'Courier',
    type: UserType.Courier,
  },
  {
    label: 'Supplier',
    type: UserType.Supplier,
  },
  {
    label: 'Hospital Worker',
    type: UserType.HospitalWorker,
  },
];
