import { BaseInfo } from '../comm/BaseInfo';

//用户总计信息
export class UserTotalInfo extends BaseInfo {
  nickName: string; //昵称
  familyName: string; //家庭名称
  totalAmount: number; //总资产
  year: number; //当前年份
  totalInCurYear: number; //当前年总收入
  totalOutCurYear: number; //当前年总支出
  totalBRInCurYear: number; //当前年总借入/还入
  totalBROutCurYear: number; //当前年总借出/还出
  month: number; //当前月份
  totalInCurMonth: number; //当前月总收入
  totalOutCurMonth: number; //当前月总支出
  totalBRInCurMonth: number; //当前月总借入/还入
  totalBROutCurMonth: number; //当前月总借出/还出
}
