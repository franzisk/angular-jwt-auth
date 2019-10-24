import { API_ROOT } from "./../constants";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, timer } from "rxjs";
import { catchError, tap, retryWhen, mergeMap, finalize } from "rxjs/operators";
import { StorageService } from "../../services/storage/storage.service";

// Strategy class to retry the request in case of any error
class GenericRetryStrategy {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
  constructor(maxRetryAttempts: number, scalingDuration: number, excludedStatusCodes: number[]) {
    this.maxRetryAttempts = maxRetryAttempts;
    this.scalingDuration = scalingDuration;
    this.excludedStatusCodes = excludedStatusCodes;
  }
}

// Function to retry when errors occur on a HTTP request
export const genericRetryStrategy = ({
  maxRetryAttempts = 3, // rety 3 times
  scalingDuration = 1000,
  excludedStatusCodes = []
}: GenericRetryStrategy = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      let throwError$: any = retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status);
      if (throwError$) {
        return throwError(error.message);
      }
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => {
      //console.log('All errors captured.')
    })
  );
};

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(public http: HttpClient, public storageService: StorageService) {}

  private endPoint(action: string): string {
    return `${API_ROOT}/${action}`;
  }

  public post(action: string, payload: any): Observable<any> {
    return (<Observable<any>>this.http.post(this.endPoint(action), payload)).pipe(
      retryWhen(genericRetryStrategy()),
      tap(() => {
        console.log("POST request finished");
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public get(action: string): Observable<any> {
    return this.http.get(this.endPoint(action));
  }
}
