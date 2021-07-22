import { GenericResponse } from './generic-response';

/**
 * Response model for the /api/hospitalWorker/hospitalWorkers
 */
export interface GetHospitalWorkersRequest extends GenericResponse {
  /**
   * Available hospital workers in the application.
   */
  hospital_workers: HospitalWorkersResponseModel[];
}

/**
 * Hospital worker from the back-end.
 */
export interface HospitalWorkersResponseModel {
  /**
   * Unique hospital worker ID.
   */
  hospital_worker_id: number;
  /**
   * Hospital worker's name/
   */
  name: string;
}
