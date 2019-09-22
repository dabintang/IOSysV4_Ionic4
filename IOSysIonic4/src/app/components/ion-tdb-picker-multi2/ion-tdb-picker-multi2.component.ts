import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PickerMultiColOption } from 'src/model/comm/PickerColOption';
import { ComHelper } from 'src/helper/comHelper';
import { PickerColumn } from '@ionic/core';
import { PickerCol } from 'src/model/comm/PickerCol';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'ion-tdb-picker-multi2',
  templateUrl: './ion-tdb-picker-multi2.component.html',
  styleUrls: ['./ion-tdb-picker-multi2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonTdbPickerMulti2Component),
      multi: true
    }
  ]
})
export class IonTdbPickerMulti2Component implements OnInit, ControlValueAccessor {

  constructor(protected pickerCtrl: PickerController) { }

  private onChange: any; //值改变事件

  @Input() placeholder: string; //输入框提示信息
  @Input() value: any; //传入值
  @Input() options: Array<PickerMultiColOption> = new Array<PickerMultiColOption>(); //选项

  @Output() ionCancel = new EventEmitter<PickerMultiColOption>(); //取消事件
  @Output() ionDone = new EventEmitter<PickerMultiColOption>(); //选择事件

  _text: string; //显示内容
  writeValue(obj: any): void {
    this.value = obj;

    //刷新显示文本
    this.refreshText();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit() { }

  //获取当前选中项（第二列选中的项）
  getSelectedItem(): PickerMultiColOption {
    let selectedItem = null; //当前选中项
    if (this.value && this.options) {
      this.options.forEach(col1 => {
        col1.childs.forEach(col2 => {
          if (this.value == col2.value) {
            selectedItem = col2;
            return selectedItem;
          }
        });
      });
    }

    return selectedItem;
  }

  //获取当前选中索引（数组第一个值为第一列选中索引，第二个值为第二列选中索引）
  getSelectedIndexs(): Array<number> {
    let selIndexs = new Array<number>(); //当前选中索引
    if (this.value && this.options) {
      for (let index1 = 0; index1 < this.options.length; index1++) {
        let col1Opt = this.options[index1];
        for (let index2 = 0; index2 < col1Opt.childs.length; index2++) {
          let col2Opt = col1Opt.childs[index2];
          if (this.value == col2Opt.value) {
            selIndexs.push(index1);
            selIndexs.push(index2);
            
            return selIndexs;
          }
        }
      }
    }

    if (selIndexs.length == 0) {
      selIndexs.push(0);
      selIndexs.push(0);
    }

    return selIndexs;
  }

  //刷新显示文本
  refreshText() {
    //如果传入有值，显示对应文本
    if (ComHelper.isEmptry(this.value) === false) {
      let selectedItem = this.getSelectedItem();
      if (selectedItem) {
        this._text = selectedItem.text;
      }
    }
  }

  //生成显示的列
  createColOptions(col1Index, col2Index): Array<PickerColumn> {
    let arrCol = new Array<PickerColumn>();

    //第一列
    let col1 = new PickerCol();
    col1.name = "col1";
    col1.selectedIndex = col1Index;
    arrCol.push(col1);
    this.options.forEach(col1Opt => {
      col1.options.push(JSON.parse(JSON.stringify(col1Opt)));
    });

    //第二列
    let col2 = new PickerCol();
    col2.name = "col2";
    col2.selectedIndex = col2Index;
    arrCol.push(col2);

    let col1Opt = this.options[col1Index];
    if (col1Opt) {
      col1Opt.childs.forEach(col2Opt => {
        col2.options.push(JSON.parse(JSON.stringify(col2Opt)));
      });
    }

    return arrCol;
  }

  async open() {
    //当前值对应选中的索引
    let selIndexs = this.getSelectedIndexs();

    //创建选择器
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: val => {
            let selectedItem = this.getSelectedItem();
            this.ionCancel.emit(selectedItem);
          }
        },
        {
          text: '选择',
          handler: val => {
            this.value = val.col2.value;
            this._text = val.col2.text;
            if (this.onChange) {
              this.onChange(this.value);
            }

            let selectedItem = this.getSelectedItem();
            this.ionDone.emit(selectedItem);
          }
        }
      ],
      columns: this.createColOptions(selIndexs[0], selIndexs[1])
    });

    //监听列改变事件
    picker.addEventListener('ionPickerColChange', async (event: any) => {
      const data = event.detail;

      //只处理第一列
      if (data.name != "col1") {
        return;
      }

      //重新设置列配置
      const columns = this.createColOptions(data.selectedIndex, 0);

      //这里有个BUG，会重影，暂时延迟调第二次解决，但是体验不好！
      picker.columns = JSON.parse(JSON.stringify(columns));
      setTimeout(() => {
        picker.columns = columns;
      }, 100);
    });

    //显示选择器
    await picker.present();
  }
}
