import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserType } from 'src/app/login/models/user-type';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../models/api/generic-response';

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {}

  /**
   * Request an update of a permission.
   * @param type Permission selected by the user.
   * @param message User's message to the administrator.
   * @returns Whether the operation was successful.
   */
  public requestPermission(type: UserType, message: string): Observable<boolean> {
    const body = { message, type };
    const url = `${environment.webApiURL}/api/requestPermission`;

    return this.http.post<GenericResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }
}
