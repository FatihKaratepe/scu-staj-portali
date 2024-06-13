import { DefaultDto } from "./default.model";

export interface Staj extends DefaultDto {
    baslangicTarihi: string,
    bitisTarihi: string,
    ogrenciNo: string,
    firmaId: number,
    firmaYetkiliId: number,
    gunSayisi: number,
    sicilId: number,
    konu: string,
    durum: 'Onay Bekliyor' | 'Basvuru Onaylandı' | 'Firma Onayı' | 'Tamamlandı' | 'Basvuru Reddedildi' | 'Staj Reddedildi',
}