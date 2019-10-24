import { Injectable } from "@angular/core";
import { StorageService } from "../storage/storage.service";
import { ApiService } from "../api/api.service";
import { User } from "../../models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public api: ApiService, private storageService: StorageService) {}

  public doLogin(user: User): Observable<any> {
    return this.api.post("auth/login", user);
  }

  public retrieveUserData(): Observable<any> {
    return this.api.get("user/user-data");
  }

  public isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  public doLogout() {
    this.storageService.removeUserData();
  }
}
