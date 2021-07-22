import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponse } from 'src/app/common/models/api/generic-response';
import { environment } from 'src/environments/environment';

@Injectable()
export class SupplierService {
  constructor(private http: HttpClient) {}

  /**
   * Update number of vaccines for this supplier.
   * @returns Whether the operation was successful or not.
   */
  public addVaccinesCount(count: number): Observable<boolean> {
    const url = `${environment.webApiURL}/api/supplier/add`;
    const body = { count };

    return this.http.post<GenericResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }
}
