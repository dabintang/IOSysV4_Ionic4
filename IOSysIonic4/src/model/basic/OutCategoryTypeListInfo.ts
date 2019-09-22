import { OutCategoryListInfo } from './OutCategoryListInfo';
import { OutTypeListInfo } from './OutTypeListInfo';

//支出类型列表
export class OutCategoryTypeListInfo extends OutCategoryListInfo {
  lstOutType: Array<OutTypeListInfo>; //支出类型列表
}