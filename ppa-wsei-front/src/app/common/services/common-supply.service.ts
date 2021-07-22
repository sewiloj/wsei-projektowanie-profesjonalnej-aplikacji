import { Courier } from '../models/courier';
import { CourierResponseModel, GetCouriersResponse } from '../models/api/get-couriers';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class CommonSupplyService {
  constructor(private http: HttpClient) {}

  /**
   * Get couriers available in the application.
   * @returns Couriers available in the application.
   */
  public getCouriers(): Observable<Courier[]> {
    const url = `${environment.webApiURL}/api/courier/couriers`;

    return this.http
      .get<GetCouriersResponse>(url)
      .pipe(map((response: GetCouriersResponse) => this.mapCouriers(response.couriers)));
  }

  /**
   * Map couriers to the front-end structure.
   */
  private mapCouriers(couriers: CourierResponseModel[]): Courier[] {
    return couriers.map((courier) => {
      return { id: courier.courier_id, name: courier.name };
    });
  }
}
