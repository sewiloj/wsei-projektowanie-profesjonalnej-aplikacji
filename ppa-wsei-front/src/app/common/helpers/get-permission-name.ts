import { TranslateService } from '@ngx-translate/core';
import { UserType } from './../../login/models/user-type';

/**
 * Get the label of the user permission.
 * @param permission Type of the user permission.
 * @returns Label of the user permission.
 */
export function getPermissionName(permission: UserType, translateService: TranslateService): string {
  switch (permission) {
    case UserType.Administrator:
      return translateService.instant('Permissions.Administrator');
    case UserType.Courier:
      return translateService.instant('Permissions.Courier');
    case UserType.HospitalWorker:
      return translateService.instant('Permissions.HospitalWorker');
    case UserType.Supplier:
      return translateService.instant('Permissions.Supplier');
    case UserType.None:
    default:
      return translateService.instant('Permissions.NoRole');
  }
}
