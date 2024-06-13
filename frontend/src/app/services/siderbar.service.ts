import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SidebarService {
    sidebarStatus$ = new BehaviorSubject<boolean>(true);

    toggleSidebar() {
        this.sidebarStatus$.pipe(take(1)).subscribe(data => {
            this.sidebarStatus$.next(!data)
        })
    }

    get sidebarStatus() {
        return this.sidebarStatus$;
    }
}