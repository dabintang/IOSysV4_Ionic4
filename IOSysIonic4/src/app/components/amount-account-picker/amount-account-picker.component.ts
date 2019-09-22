import { Component, OnInit, forwardRef } from '@angular/core';
import { IonTdbPickerSingleComponent } from '../ion-tdb-picker-single/ion-tdb-picker-single.component';
import { PickerController } from '@ionic/angular';
import { BasicStore } from 'src/store/BasicStore';
import { BasicAPI } from 'src/api/BasicAPI';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerColOption } from 'src/model/comm/PickerColOption';

@Component({
  selector: 'amount-account-picker',
  templateUrl: './amount-account-picker.component.html',
  styleUrls: ['./amount-account-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AmountAccountPickerComponent),
    multi: true
  }]
})
export class AmountAccountPickerComponent extends IonTdbPickerSingleComponent {

  constructor(
    protected pickerCtrl: PickerController,
    private basicStore: BasicStore,
    private basicAPI: BasicAPI) {
    super(pickerCtrl);
  }

  ngOnInit() {
    //初始化选项
    this.initOptions();
  }

  //初始化选项
  async initOptions() {
    let list = this.basicStore.getAmountAccountList();
    if (list == null) {
      //查询列表
      list = (await this.basicAPI.queryAmountAccount(false)).lstInfo;
    }

    //构建选项
    list.forEach(item => {
      let option = new PickerColOption();
      option.text = item.name;
      option.value = item.id;
      option.disabled = !item.isActive;

      this.options.push(option);
    });

    //刷新显示文本
    this.refreshText();
  }
}
