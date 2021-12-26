import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowMenuService {
  public show:Boolean=false
  constructor() { }

  showMenu(){
    if(localStorage.getItem('Usuario')){
      return true
    }else{
      return false
    }
  }
  
  
}
