import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonTdbPickerSingleComponent } from '../ion-tdb-picker-single/ion-tdb-picker-single.component';
import { PickerController } from '@ionic/angular';
import { BasicStore } from 'src/store/BasicStore';
import { BasicAPI } from 'src/api/BasicAPI';
import { PickerAccColOption } from 'src/model/comm/PickerColOption';

@Component({
  selector: 'in-type-picker',
  templateUrl: './in-type-picker.component.html',
  styleUrls: ['./in-type-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InTypePickerComponent),
    multi: true
  }]
})
export class InTypePickerComponent extends IonTdbPickerSingleComponent {

  constructor(
    protected pickerCtrl: PickerController,
    private basicStore: BasicStore,
    private basicAPI: BasicAPI
  ) {
    super(pickerCtrl);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    //初始化选项
    this.initOptions();
  }

  //初始化选项
  async initOptions() {
    let list = this.basicStore.getInTypeList();
    if (list == null) {
      //查询列表
      list = (await this.basicAPI.queryInType(false)).lstInfo;
    }

    //构建选项
    list.forEach(item => {
      let option = new PickerAccColOption();
      option.text = item.name;
      option.value = item.id;
      option.disabled = !item.isActive;
      option.amountAccountID = item.amountAccountID;

      this.options.push(option);
    });

    //刷新显示文本
    this.refreshText();
  }
}
