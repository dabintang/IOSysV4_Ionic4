import { Injectable } from '@angular/core';
import axios from 'axios';
import { BaseReq } from 'src/model/comm/BaseReq';
import { BaseInfo } from 'src/model/comm/BaseInfo';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { AccountStore } from 'src/store/AccountStore';
import { Router } from '@angular/router';
import { DateHelper } from 'src/helper/DateHelper';
import { ConfigStore } from 'src/store/ConfigStore';

declare const require: any;
const qs = require('qs');

@Injectable()
export class API {
  //构造函数
  constructor(
    private msgBox: MsgboxUtil, 
    private accStore: AccountStore, 
    private configStroe: ConfigStore,
    private router: Router) {
    //添加一个请求拦截器
    axios.interceptors.request.use(
      function (config) {
        //请求参数
        const params = config.method === 'post' ? config.data : config.params;

        //显示等待框
        if (params.showLoader) {
          msgBox.loading();
        }

        //传入Token
        const loginInfo = accStore.getLoginInfo();
        if (loginInfo != null) {
          // 判断是否存在Token，如果存在的话，则每个http header都加上Token
          config.headers.Authorization = `${loginInfo.token}`;
        }

        //删除是否显示等待框的属性
        delete params.showLoader;

        return config;
      },
      function (error) {
        //关闭等待框
        msgBox.dismissLoading();

        return Promise.reject(error);
      }
    );

    // 添加一个响应拦截器
    axios.interceptors.response.use(
      function (response) {
        //关闭等待框
        msgBox.dismissLoading();

        return response;
      },
      async function (error) {
        //关闭等待框
        msgBox.dismissLoading();

        //如果是未授权错误，跳到登录页
        if (error.response) {
          switch (error.response.status) {
            case 401:
              //跳到登录页
              router.navigate(['login']);

              msgBox.infoDanger('登录超时，请重新登录');

              return Promise.reject(error);
          }
        }

        //跳到错误页
        router.navigate(['error'], { queryParams: { errMsg: '请求出现异常（' + error + '）' } });

        //弹框显示错误
        // msgBox.infoDanger('请求出现异常（' + error + '）');

        return Promise.reject(error);
      }
    );
  }

  //post请求
  //url：请求地址
  //params：请求参数
  //showLoader：是否显示等待框
  async postReq<T>(url: string, params: BaseReq = null, showLoader: boolean = true): Promise<T> {
    if (params == null) {
      params = new BaseReq();
    }
    params.showLoader = showLoader;

    let apiBaseUrl = this.configStroe.getApiBaseUrl();
    const res = await axios.post<T>(`${apiBaseUrl}${url}`, params);
    return res.data;
  }

  //post请求
  //url：请求地址
  //params：请求参数
  //showLoader：是否显示等待框
  async postInfo<T>(url: string, params: BaseInfo, showLoader: boolean = true): Promise<T> {
    if (params == null) {
      params = new BaseInfo();
    }
    params.showLoader = showLoader;

    let apiBaseUrl = this.configStroe.getApiBaseUrl();
    const res = await axios.post<T>(`${apiBaseUrl}${url}`, params);
    return res.data;
  }

  //get请求
  //url：请求地址
  //params：请求参数
  //showLoader：是否显示等待框
  async get<T>(url: string, params: BaseReq = null, showLoader: boolean = true): Promise<T> {
    if (params == null) {
      params = new BaseReq();
    }
    params.showLoader = showLoader;

    let apiBaseUrl = this.configStroe.getApiBaseUrl();
    const res = await axios.get(`${apiBaseUrl}${url}`, {
      params: params,
      // tslint:disable-next-line: no-shadowed-variable
      paramsSerializer: function (params) {
        return qs.stringify(
          params,
          {
            arrayFormat: 'repeat',
            serializeDate: (date) => {
              //用moment处理日期比较方便，自己写格式化方法也可以
              return DateHelper.format(date, 'yyyy-MM-dd hh:mm:ss');
            }
          });
      }
    });

    return res.data;
  }
}
