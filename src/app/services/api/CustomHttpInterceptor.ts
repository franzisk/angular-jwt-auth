import { StorageService } from "./../storage/storage.service";
import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

// This is a Http interceptor to act sending the JWT token on the header of the request
// Based on this token the server side API decides what to do and sends a response

// You should take a look at app.module.ts to see how this class was registered to work properly intercepting requests
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("HTTP interceptor called");
    return from(this.handleAccess(request, next));
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const token = this.storageService.getToken();
    let changedRequest = request;

    // HttpHeader object is immutable, we need to make a copy of the original header to a new object
    const headerSettings: { [name: string]: string | string[] } = {};

    // copying here...
    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    // is there a oken? Add it to the header
    if (token) {
      headerSettings["Authorization"] = `Bearer ${token}`;
    }
    headerSettings["Content-Type"] = "application/json";
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });
    return next.handle(changedRequest).toPromise();
  }
}
