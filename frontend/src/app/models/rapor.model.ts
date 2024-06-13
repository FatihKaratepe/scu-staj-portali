export interface Rapor {
    id: number,
    baslik: string | null,
    aciklama: string | null,
    durum: 'Onay Bekliyor' | 'Onaylandı' | 'Reddedildi' | 'Girilmedi',
    stajId: number,
    tarih: string
}