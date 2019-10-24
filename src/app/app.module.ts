import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PublicComponent } from "./components/public/public.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomHttpInterceptor } from "./services/api/CustomHttpInterceptor";

@NgModule({
  declarations: [AppComponent, LoginFormComponent, DashboardComponent, PublicComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
