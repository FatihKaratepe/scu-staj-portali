import { DefaultDto } from "./default.model";

export interface Firma extends DefaultDto {
    firmaAdi: string,
    telefon: string,
    adres: string,
    hizmetAlani: string,
    createdBy: string
}