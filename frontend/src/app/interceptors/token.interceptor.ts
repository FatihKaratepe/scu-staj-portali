import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('noToken')) {
      try {
        let newReq = req.clone({
          setHeaders: {
            Authorization: this.authService.getUserDetails().token,
          },
        });
        return next.handle(newReq);
      } catch (e) {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
