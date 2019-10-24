import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-public",
  templateUrl: "./public.component.html",
  styleUrls: ["./public.component.scss"]
})
export class PublicComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
