import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {

  constructor() { }

  getValue(key: string) {
    return localStorage.getItem(key);
  }

  setValue(data: Object) {
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        localStorage.setItem(i, data[i]);
      }
    }
  }

  resetStorage() {
    localStorage.clear();
  }
}
