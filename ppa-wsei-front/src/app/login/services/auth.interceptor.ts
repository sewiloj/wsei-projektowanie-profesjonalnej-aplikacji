import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Add authorization token for all requests excluding register and login.
   */
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skipRequestUrls = ['register', 'login'];
    const shouldSkipToken = skipRequestUrls.some((url) => httpRequest.url.includes(url));

    if (!shouldSkipToken) {
      const token = localStorage.getItem('token');
      return next.handle(httpRequest.clone({ setHeaders: { token } }));
    }

    return next.handle(httpRequest);
  }
}
