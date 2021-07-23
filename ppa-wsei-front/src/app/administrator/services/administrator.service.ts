import { GenericResponse } from './../../common/models/api/generic-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetRequestPermissionsResponse, RequestPermission } from '../models/api/get-request-permissions';
import { HandleRequestPermissionRequest } from '../models/api/handle-request-permission';
import { UserPermissionRequest } from '../models/user-permission-request';
import { UserPermissionRequestStatus } from '../models/user-permission-request-status';

@Injectable()
export class AdministratorService {
  constructor(private http: HttpClient) { }

  /**
   * Get the permission requests from the user. Filter out the accepted and rejected ones.
   * @returns Permission requests from the users.
   */
  public getRequestPermissions(): Observable<UserPermissionRequest[]> {
    const url = `${environment.webApiURL}/api/administrator/requests`;

    return this.http
      .get<GetRequestPermissionsResponse>(url)
      .pipe(map((response: GetRequestPermissionsResponse) => this.mapRequestPermissions(response.requests)));
  }

  /**
   * Accept or decline the permission request.
   * @param isAccepted Whether the administrator accepted or declined the request.
   * @param permissionId Unique ID of the permission.
   * @returns Whether the operation was successful.
   */
  public handleRequestPermission(isAccepted: boolean, permissionId: number): Observable<boolean> {
    const url = `${environment.webApiURL}/api/administrator/handleRequest`;
    const body: HandleRequestPermissionRequest = { is_accepted: isAccepted, permission_id: permissionId };

    return this.http.post<GenericResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }

  /**
   * Get the front-end friendly model with only not accepted nor rejected requests.
   * @param requests All request permissions.
   * @returns Front-end friendly model with only not accepted nor rejected requests.
   */
  private mapRequestPermissions(requests: RequestPermission[]): UserPermissionRequest[] {
    return requests
      .filter((request) => Number(request.accepted) === UserPermissionRequestStatus.None)
      .map((request) => {
        return { type: Number(request.permission), name: request.name, message: request.message, id: request.id };
      });
  }
}
