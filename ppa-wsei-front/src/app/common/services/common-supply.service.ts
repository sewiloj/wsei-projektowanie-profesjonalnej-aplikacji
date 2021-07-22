import { GetHospitalWorkersRequest, HospitalWorkersResponseModel } from './../models/api/get-hospital-workers';
import { BaseUserInformation } from '../models/base-user-information';
import { CourierResponseModel, GetCouriersResponse } from '../models/api/get-couriers';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponse } from '../models/api/generic-response';

@Injectable()
export class CommonSupplyService {
  constructor(private http: HttpClient) {}

  /**
   * Get couriers available in the application.
   * @returns Couriers available in the application.
   */
  public getCouriers(): Observable<BaseUserInformation[]> {
    const url = `${environment.webApiURL}/api/courier/couriers`;

    return this.http
      .get<GetCouriersResponse>(url)
      .pipe(map((response: GetCouriersResponse) => this.mapCouriers(response.couriers)));
  }

  /**
   * Get hospital workers available in the application.
   * @returns Hospital workers available in the application.
   */
  public getHospitalWorkers(): Observable<BaseUserInformation[]> {
    const url = `${environment.webApiURL}/api/hospitalWorker/hospitalWorkers`;

    return this.http
      .get<GetHospitalWorkersRequest>(url)
      .pipe(map((response: GetHospitalWorkersRequest) => this.mapHospitalWorkers(response.hospital_workers)));
  }

  /**
   * Move the vaccines from current user to the specified user.
   * @param userId User that we are transferring vaccines to.
   * @param count Count of vaccines being transferred.
   * @returns Whether the operation was successful or not.
   */
  public transferVaccines(userId: number, count: number): Observable<boolean> {
    const url = `${environment.webApiURL}/api/common/transfer`;
    const body = { user_id: userId, count };

    return this.http.post<GenericResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }

  /**
   * Map couriers to the front-end structure.
   */
  private mapCouriers(couriers: CourierResponseModel[]): BaseUserInformation[] {
    return couriers.map((courier) => {
      return { id: courier.courier_id, name: courier.name };
    });
  }

  /**
   * Map hospital workers to the front-end structure.
   */
  private mapHospitalWorkers(hospitalWorkers: HospitalWorkersResponseModel[]): BaseUserInformation[] {
    return hospitalWorkers.map((hospitalWorker) => {
      return { id: hospitalWorker.hospital_worker_id, name: hospitalWorker.name };
    });
  }
}
