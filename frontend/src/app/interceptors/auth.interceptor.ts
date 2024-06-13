import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class Auth401Interceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private notificationService: NotificationService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.notificationService.showError('Oturum süresi doldu', 'Hata');
                    this.authService.startAuthentication();
                }
                return throwError(() => error);
            }),
        );
    }
}




