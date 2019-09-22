import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonTdbPickerMulti2Component } from '../ion-tdb-picker-multi2/ion-tdb-picker-multi2.component';
import { PickerController } from '@ionic/angular';
import { BasicStore } from 'src/store/BasicStore';
import { BasicAPI } from 'src/api/BasicAPI';
import { PickerAccMultiColOption } from 'src/model/comm/PickerColOption';
import { OutCategoryTypeListInfo } from 'src/model/basic/OutCategoryTypeListInfo';

@Component({
  selector: 'out-type-picker',
  templateUrl: './out-type-picker.component.html',
  styleUrls: ['./out-type-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OutTypePickerComponent),
      multi: true
    }
  ]
})
export class OutTypePickerComponent extends IonTdbPickerMulti2Component {

  constructor(
    protected pickerCtrl: PickerController,
    private basicStore: BasicStore,
    private basicAPI: BasicAPI
  ) {
    super(pickerCtrl);
  }

  ngOnInit() {
    //初始化选项
    this.initOptions();
  }

  //初始化选项
  async initOptions() {
    let list = this.basicStore.getOutCategoryTypeList();
    if (list == null) {
      //查询列表
      list = (await this.basicAPI.queryOutCategoryType(false)).lstInfo;
    }

    //循环分类，构建选项
    list.forEach(outCategory => {
      let outCategoryOpt = new PickerAccMultiColOption();
      this.options.push(outCategoryOpt);

      outCategoryOpt.text = outCategory.name;
      outCategoryOpt.value = outCategory.id;
      outCategoryOpt.disabled = !outCategory.isActive;

      //循环类型，构建选项
      outCategory.lstOutType.forEach(outType => {
        let outTypeOpt = new PickerAccMultiColOption();
        outTypeOpt.text = outType.name;
        outTypeOpt.value = outType.id;
        outTypeOpt.disabled = !outType.isActive;
        outTypeOpt.amountAccountID = outType.amountAccountID;

        outCategoryOpt.childs.push(outTypeOpt);
      });
    });

    //刷新显示文本
    this.refreshText();
  }
}
