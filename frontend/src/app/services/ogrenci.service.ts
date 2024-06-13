import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Firma } from '../models/firma.model';
import { FirmaYetkili } from '../models/firma-yetkili.model';
import { Staj } from '../models/staj.model';
import { Ogrenci } from '../models/ogrenci.model';
import { Rapor } from '../models/rapor.model';

@Injectable({ providedIn: 'root' })

export class OgrenciService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    currentId: string = this.authService.getUserDetails().ogrenciNo;

    getOgrenci(ogrenciNo: string): Observable<Ogrenci> {
        return this.httpClient.get<Ogrenci>(`${environment.api}/ogrenci/${ogrenciNo}`);
    }

    getStajList(): Observable<Staj[]> {
        return this.httpClient.get<Staj[]>(`${environment.api}/ogrenci/${this.currentId}/staj`);
    }

    addBasvuru(stajDto: any): Observable<Staj> {
        return this.httpClient.post<Staj>(`${environment.api}/ogrenci/${this.currentId}/staj`, stajDto);
    }

    getStajDetail(stajId: number): Observable<Staj> {
        return this.httpClient.get<Staj>(`${environment.api}/ogrenci/${this.currentId}/staj/${stajId}`);
    }

    getRapors(stajId: number): Observable<Rapor[]> {
        return this.httpClient.get<Rapor[]>(`${environment.api}/ogrenci/${this.currentId}/staj/${stajId}/rapor`);
    }

    addRapor(stajId: number, raporDto: any) {
        return this.httpClient.post<any>(`${environment.api}/ogrenci/${this.currentId}/staj/${stajId}/rapor`, raporDto);
    }

    updateRapor(stajId: number, raporDto: any) {
        return this.httpClient.put<any>(`${environment.api}/ogrenci/${this.currentId}/staj/${stajId}/rapor`, raporDto);
    }

    addFirma(firmaDto: any): Observable<Firma> {
        return this.httpClient.post<Firma>(`${environment.api}/ogrenci/${this.currentId}/firma`, firmaDto);
    }

    addFirmaYetkili(firmaYetkiliDto: any): Observable<FirmaYetkili> {
        return this.httpClient.post<FirmaYetkili>(`${environment.api}/ogrenci/${this.currentId}/firmaYetkili`, firmaYetkiliDto);
    }

    printBasvuru(stajId: number, babaAdi: string, anaAdi: string, dogumYeri: string, dogumTarihi: string, tcNo: string, seriNo: string, kayitliOlduguIl: string, kayitliOlduguIlce: string, mahalle: string, ciltNo: string, aileSiraNo: string, siraNo: string, verildigiYer: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/ogrenci/basvuru`, { stajId, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer });
    }

    // searchOgrenci(input: string): Observable<Ogrenci[]> {
    //     return this.httpClient.get<Ogrenci[]>(`${environment.api}/search/ogrenci?q=${input}`);
    // }

}