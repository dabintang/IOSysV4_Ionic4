import { Injectable } from '@angular/core';

@Injectable()
export class Store {
  constructor() {}

  //写缓存localStorage
  setLocal(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }

  //读缓存localStorage
  getLocal<T>(key: string): T {
    let value: string = localStorage.getItem(key);
    if (value && value !== 'undefined' && value !== 'null') {
      return <T>JSON.parse(value);
    }
    return null;
  }

  //写缓存sessionStorage
  setSession(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }

    sessionStorage.setItem(key, value);
  }

  //读缓存sessionStorage
  getSession<T>(key: string): T {
    let value: string = sessionStorage.getItem(key);
    if (value && value !== 'undefined' && value !== 'null') {
      return <T>JSON.parse(value);
    }
    return null;
  }
}
