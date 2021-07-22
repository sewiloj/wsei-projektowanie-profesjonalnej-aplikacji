import { GenericResponse } from './generic-response';

/**
 * Response model for the /api/courier/couriers
 */
export interface GetCouriersResponse extends GenericResponse {
  /**
   * Available couriers in the application.
   */
  couriers: CourierResponseModel[];
}

/**
 * Courier from the back-end.
 */
export interface CourierResponseModel {
  /**
   * Unique courier ID.
   */
  courier_id: number;
  /**
   * Courier's name/
   */
  name: string;
}
