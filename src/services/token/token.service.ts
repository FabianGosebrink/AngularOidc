import { Injectable } from '@angular/core';
import { Token } from 'src/constants/const';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  
  
  getToken(): string|null {
    return localStorage.getItem(Token.ACCESS_TOKEN);    
  }

  getRefreshToken(): string|null {
    return localStorage.getItem(Token.REFRESH_TOKEN);
  }

  saveToken(token: string): void {
    localStorage.setItem(Token.ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(Token.REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(Token.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(Token.REFRESH_TOKEN);
  }

  isTokenExpired(token: string):boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
