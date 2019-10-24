import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../app/components/dashboard/dashboard.component";
import { PublicComponent } from "../app/components/public/public.component";
import { LoginFormComponent } from "../app/components/login-form/login-form.component";
import { AuthGuard } from "../app/guards/auth/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" }, // root access redirect to login
  { path: "login", component: LoginFormComponent }, // public access
  { path: "public", component: PublicComponent }, // free access
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }, // protected url, only logged in users
  {
    path: "**", // anything not found goes to login page
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
