import { Component } from "@angular/core";
import { AuthService } from "../app/services/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
  }
}
