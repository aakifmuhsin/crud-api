import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
  setUpdate(user: any) {
    sessionStorage.setItem('userForUpdate', JSON.stringify(user));
  }
  getUpdate() {
    return JSON.parse(sessionStorage.getItem('userForUpdate') ?? 'null');
  }
  constructor() { }
}
