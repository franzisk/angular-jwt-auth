import { Injectable } from "@angular/core";

const JWT_TOKEN: string = "JWT_TOKEN";
const USER_DATA_KEY: string = "USER_DATA_KEY";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}

  public saveToken(token: string): void {
    localStorage.setItem(JWT_TOKEN, token);
  }

  public getToken(): string {
    return localStorage.getItem(JWT_TOKEN);
  }

  public saveUserData(dados: any) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(dados));
  }

  public getUserData(): any {
    let userData: any = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      userData = JSON.parse(userData);
    } else {
      userData = null;
    }
    return userData;
  }

  public removeUserData(): void {
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(USER_DATA_KEY);
  }

  public isLoggedIn(): boolean {
    const logged: boolean = this.getToken() !== undefined && this.getToken() !== null;
    return logged;
  }
}
