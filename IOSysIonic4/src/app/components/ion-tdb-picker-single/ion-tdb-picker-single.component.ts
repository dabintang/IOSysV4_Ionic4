import { Component, Input, EventEmitter, Output, OnInit, forwardRef } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerColumnOption } from '@ionic/core';
import { ComHelper } from 'src/helper/comHelper';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ion-tdb-picker-single',
  templateUrl: './ion-tdb-picker-single.component.html',
  styleUrls: ['./ion-tdb-picker-single.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonTdbPickerSingleComponent),
      multi: true
    }
  ]
})
export class IonTdbPickerSingleComponent implements OnInit, ControlValueAccessor {
  constructor(protected pickerCtrl: PickerController) { }
  private onChange: any; //值改变事件

  @Input() placeholder: string; //输入框提示信息
  @Input() value: any; //传入值
  @Input() options = new Array<PickerColumnOption>(); //选项

  @Output() ionCancel = new EventEmitter<PickerColumnOption>(); //取消事件
  @Output() ionDone = new EventEmitter<PickerColumnOption>(); //选择事件

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

  async open() {
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
            this.value = val.data.value;
            this._text = val.data.text;
            if (this.onChange) {
              this.onChange(this.value);
            }

            let selectedItem = this.getSelectedItem();
            this.ionDone.emit(selectedItem);
          }
        }
      ],
      columns: [
        {
          name: 'data',
          options: JSON.parse(JSON.stringify(this.options)),
          selectedIndex: this.getSelectedIndex()
        }
      ]
    });

    //显示选择器
    await picker.present();
  }

  //获取当前选中项索引
  getSelectedIndex(): number {
    let selectedIndex = 0;
    if (this.value && this.options && this.options.length > 0) {
      this.options.forEach((item, index) => {
        if (this.value === item.value) {
          selectedIndex = index;
          return -1;
        }
      });
    }

    return selectedIndex;
  }

  //获取当前选中项
  getSelectedItem(): PickerColumnOption {
    let selectedItem = null; //当前选中项
    if (this.value && this.options && this.options.length > 0) {
      this.options.forEach((item, index) => {
        if (this.value === item.value) {
          selectedItem = item;
          return -1;
        }
      });
    }

    return selectedItem;
  }

  //刷新显示文本
  refreshText() {
    //如果传入有值，显示对应文本
    if (ComHelper.isEmptry(this.value) === false) {
      let selectedItem = this.getSelectedItem();
      if (selectedItem != null) {
        this._text = selectedItem.text;
      }
    }
  }
}
