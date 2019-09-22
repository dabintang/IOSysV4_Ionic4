import { PickerColumnOption } from '@ionic/core';

//选择框列配置
export class PickerColOption implements PickerColumnOption {
  text: string;
  value: any;
  disabled?: boolean;
  duration?: number;
  transform?: string;
  selected?: boolean;
}

//带默认账户的选择框列配置
export class PickerAccColOption extends PickerColOption {
  amountAccountID: number; //账户ID
}

//联级选择框列配置
export class PickerMultiColOption extends PickerColOption {
  childs: Array<PickerAccMultiColOption> = new Array<PickerAccMultiColOption>(); //子级
}

//带默认账户的联级选择框列配置
export class PickerAccMultiColOption extends PickerAccColOption {
  childs: Array<PickerAccMultiColOption> = new Array<PickerAccMultiColOption>(); //子级
}