import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(private httpClient: HttpClient, private router: Router) { }

    startAuthentication(): void {
        localStorage.removeItem(environment.storageName);
        setTimeout(() => {
            location.reload();
        }, 200);
    }

    setUserDetails(user: any, userType: string, routeUser: boolean = false): void {
        localStorage.setItem(environment.storageName, JSON.stringify({ ...user, userType }))
        if (routeUser) {
            switch (userType) {
                case 'Fakulte':
                    this.router.navigate(['fakulte/']);
                    break;
                case 'Firma':
                    this.router.navigate(['firma/']);
                    break;
                case 'Ogrenci':
                    this.router.navigate(['ogrenci/']);
                    break;
            }
            setTimeout(() => {
                location.reload();
            }, 200);
        }
    }

    getUserDetails(): any {
        return JSON.parse(localStorage.getItem(environment.storageName)!);
    }

    login(userType: string, userName: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'No-Token-Control': 'No',
        });
        return this.httpClient.post<any>(`${environment.api}/login`, { userType, userName, password }, { headers: headers })
    }

    changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
        const userDetails = this.getUserDetails();
        const userName = userDetails.userType === 'Ogrenci' ? userDetails.ogrenciNo : (userDetails.userType === 'Fakulte' ? userDetails.tcNo : userDetails.eposta)
        const dto = {
            userType: userDetails.userType,
            userName: userName,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        }
        return this.httpClient.post<any>(`${environment.api}/change-password`, dto)
    }

}