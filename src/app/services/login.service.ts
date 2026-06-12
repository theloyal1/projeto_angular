import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl : String = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((value) => {
        localStorage.setItem('auth-token', value.token);
        localStorage.setItem('username', value.name);
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post(`${this.apiUrl}/signup`, { name, email, password });
  }
}
