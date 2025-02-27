import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private client: HttpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:3300/api';

  constructor() { }

  public registerUser(username:string, email:string, password:string) {
    return this.client.post(`${this.baseUrl}/register`, { username, email, password })
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }
  public loginUser(username:string, password:string) {
    return this.client.post(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response:any) => {
          this.addUserToLocalStorage(response.token, response.user);
          console.log(response);
        })
      );
  }
  private addUserToLocalStorage(token:string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  private getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      return { user: JSON.parse(user), token };
    }
    return;
  }
  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
