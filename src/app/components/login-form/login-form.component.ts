import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage/storage.service";
import { AuthService } from "../../services/auth/auth.service";
import { User } from "../../models/User";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted = false;
  public user: User = { username: "secure.user@websitecompany.com", password: "ThePassword@987" };

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Creates the login form
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])]
    });
  }

  // Returns only the controls (understand: fields) of the login form
  get formControls() {
    return this.loginForm.controls;
  }

  // Submits the login form (using ES6 arrow function syntax)
  submitLogin = async () => {
    // Form fields not ok? Does nothing...
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    try {
      const loginData: any = await this.authService.doLogin(this.user).toPromise();
      const token: string = loginData.token;
      this.storageService.saveToken(token);

      const userData: any = await this.authService.retrieveUserData().toPromise();
      this.storageService.saveUserData(userData);

      this.router.navigateByUrl("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };
}
