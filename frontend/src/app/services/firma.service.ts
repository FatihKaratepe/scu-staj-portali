import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { Firma } from '../models/firma.model';
import { FirmaYetkili } from '../models/firma-yetkili.model';
import { AuthService } from './auth.service';
import { Staj } from '../models/staj.model';
import { Rapor } from '../models/rapor.model';

@Injectable({ providedIn: 'root' })

export class FirmaService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    currentId: number = this.authService.getUserDetails().id;

    getFirmaList(): Observable<Firma[]> {
        return this.httpClient.get<Firma[]>(`${environment.api}/firma`);
    }

    getFirma(id: number): Observable<Firma> {
        return this.httpClient.get<Firma>(`${environment.api}/firma/${id}`);
    }

    getFirmaYetkiliList(firmaId: number): Observable<FirmaYetkili[]> {
        return this.httpClient.get<FirmaYetkili[]>(`${environment.api}/firma/${firmaId}/firmaYetkili`);
    }

    getFirmaYetkili(id: number): Observable<FirmaYetkili> {
        return this.httpClient.get<FirmaYetkili>(`${environment.api}/firmaYetkili/${id}`);
    }

    getFirmaStajList(): Observable<Staj[]> {
        return this.httpClient.get<Staj[]>(`${environment.api}/firmaYetkili/${this.currentId}/staj`);
    }

    getFirmaStaj(stajId: number): Observable<Staj> {
        return this.httpClient.get<Staj>(`${environment.api}/firmaYetkili/${this.currentId}/staj/${stajId}`);
    }

    getFirmaYetkiliRaporList(stajId: number): Observable<Rapor[]> {
        return this.httpClient.get<Rapor[]>(`${environment.api}/firmaYetkili/${this.currentId}/staj/${stajId}/rapor`);
    }

    getFirmaYetkiliRapors(): Observable<{ stajId: number, raporId: number, tarih: string, ogrenciNo: string, durum: string }[]> {
        return this.httpClient.get<{ stajId: number, raporId: number, tarih: string, ogrenciNo: string, durum: string }[]>(`${environment.api}/firmaYetkili/${this.currentId}/rapors`);
    }

    changeRaporStatus(stajId: number, raporId: number, durum: string): Observable<Rapor> {
        return this.httpClient.post<Rapor>(`${environment.api}/firmaYetkili/${this.currentId}/staj/${stajId}/rapor`, { raporId, durum });
    }

    sendAuthFirmaYetkili(firmaYetkiliId: number): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/firmaYetkili/send-auth`, { firmaYetkiliId });
    }

    updateFirma(firmaId: number, payload: { firmaAdi: string, telefon: string, adres: string, hizmetAlani: string }): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/firma/${firmaId}/update`, payload);
    }

    updateFirmaYetkili(firmaYetkiliId: number, payload: { eposta: string, isim: string, soyisim: string, gorev: string }): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/firmaYetkili/${firmaYetkiliId}/update`, payload);
    }

    updateSicil(payload: { stajId: number, subeBirim: string, devamDurumu: string, devamDurumuDusunce: string, calismaGayreti: string, calismaGayretiDusunce: string, isiTamYapma: string, isiTamYapmaDusunce: string, isYeriTutumu: string, isYeriTutumuDusunce: string }): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/firmaYetkili/update-sicil`, payload);
    }

}