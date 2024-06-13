import { DefaultDto } from "./default.model";

export interface FirmaYetkili extends DefaultDto {
    eposta: string,
    isim: string,
    soyisim: string,
    gorev: string,
    firmaId: number,
    createdBy: string
}