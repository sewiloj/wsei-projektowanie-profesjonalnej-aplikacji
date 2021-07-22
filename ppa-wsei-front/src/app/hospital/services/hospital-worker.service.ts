import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponse } from 'src/app/common/models/api/generic-response';
import { environment } from 'src/environments/environment';
import { GetPatientsCountResponse } from '../models/api/get-patients-count';
import { RequestSupplyRequest } from '../models/api/request-supply';

@Injectable()
export class HospitalWorkerService {
  constructor(private http: HttpClient) {}

  /**
   * Get count of hospitalized people.
   * @returns Count of hospitalized people.
   */
  public getPatientsCount(): Observable<number> {
    const url = `${environment.webApiURL}/api/patientsCount`;

    return this.http
      .get<GetPatientsCountResponse>(url)
      .pipe(map((response: GetPatientsCountResponse) => response.count));
  }

  /**
   * Update count of hospitalized people.
   * @returns Whether the operation was successful or not.
   */
  public updatePatientsCount(count: number): Observable<boolean> {
    const url = `${environment.webApiURL}/api/patientsCount`;
    const body = { count };

    return this.http.post<GenericResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }

  /**
   * Request vaccines from the courier.
   * @param count Number of vaccines requested.
   * @returns Whether the operation was successful or not.
   */
  public requestSupply(count: number): Observable<boolean> {
    const body: RequestSupplyRequest = { vaccine_count: count };
    const url = `${environment.webApiURL}/api/hospital/requestSupply`;

    return this.http.post<GenericResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }
}
