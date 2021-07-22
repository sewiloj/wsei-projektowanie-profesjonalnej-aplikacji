import { GenericResponse } from './../../../common/models/api/generic-response';

/**
 * Model for the api/hospital/patientsCount response.
 */
export interface GetPatientsCountResponse extends GenericResponse {
  /**
   * Count of hospitalized people.
   */
  count: number;
}
