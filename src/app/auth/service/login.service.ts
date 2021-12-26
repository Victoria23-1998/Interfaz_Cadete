import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../interface/userResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  


  constructor(private http: HttpClient) { }
  
  public Login(email:string, password:string): Observable<UserResponse>{
    return this.http.get<UserResponse>(`/api/Login?email=${email}&password=${password}`)
                    
  }
  logOut() {
    
    localStorage.removeItem('Usuario');
  }
}
