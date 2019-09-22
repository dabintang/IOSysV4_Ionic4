import { PickerColumn, PickerColumnOption } from '@ionic/core';

//picker列
export class PickerCol implements PickerColumn {
  name: string;
  align?: string;
  selectedIndex?: number;
  prevSelected?: number;
  prefix?: string;
  suffix?: string;
  options: Array<PickerColumnOption> = new Array<PickerColumnOption>();
  cssClass?: string | string[];
  columnWidth?: string;
  prefixWidth?: string;
  suffixWidth?: string;
  optionsWidth?: string;
  refresh?: () => void;
}