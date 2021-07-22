import { TransferSelectable } from './transfer-selectable';

/**
 * Model for the data being injected in the TransferSupplyComponent.
 */
export interface TransferDialogData {
  /**
   * <mat-select> label.
   */
  label: string;
  /**
   * People that are selectable in the <mat-select>
   */
  selectables: TransferSelectable[];
}
