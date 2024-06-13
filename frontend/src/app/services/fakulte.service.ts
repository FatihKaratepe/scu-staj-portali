import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { Staj } from '../models/staj.model';
import { Rapor } from '../models/rapor.model';

@Injectable({ providedIn: 'root' })

export class FakulteService {
    constructor(private httpClient: HttpClient) { }

    getStajList(durum?: string): Observable<Staj[]> {
        if (durum) return this.httpClient.get<Staj[]>(`${environment.api}/fakulte/staj?durum=${durum}`);
        return this.httpClient.get<Staj[]>(`${environment.api}/fakulte/staj`);
    }

    stajSearch(ogrenciNo: string, durum: string): Observable<Staj[]> {
        return this.httpClient.get<Staj[]>(`${environment.api}/fakulte/search/staj?durum=${durum}&ogrenciNo=${ogrenciNo}`);
    }

    changeStajStatus(stajId: number, durum: string): Observable<Staj> {
        return this.httpClient.put<Staj>(`${environment.api}/fakulte/staj/${stajId}`, { durum });
    }

    getStajDetail(stajId: number): Observable<Staj> {
        return this.httpClient.get<Staj>(`${environment.api}/fakulte/staj/${stajId}`);
    }

    getStajRapors(stajId: number): Observable<Rapor[]> {
        return this.httpClient.get<Rapor[]>(`${environment.api}/fakulte/staj/${stajId}/rapor`);
    }

    approveStaj(stajId: number): Observable<Staj> {
        return this.httpClient.post<Staj>(`${environment.api}/fakulte/staj`, { stajId });
    }

    printSicil(stajId: number): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/fakulte/sicil`, { stajId });
    }

    printDefter(stajId: number): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/fakulte/defter`, { stajId });
    }
    
    kabulEdilenGun(stajId: number, gunSayisi: number): Observable<any> {
        return this.httpClient.post<any>(`${environment.api}/fakulte/kabul-edilen-gun`, { stajId, gunSayisi });
    }
}