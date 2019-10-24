import { StorageService } from "./../../services/storage/storage.service";
import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public userData: any = null;

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.userData = this.storageService.getUserData();
  }

  executeLogout() {
    this.authService.doLogout();
    this.router.navigateByUrl("/login");
  }
}
