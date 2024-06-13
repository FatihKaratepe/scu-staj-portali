# Staj Takip Sistemi
İş yerlerinde staj yapacak olan öğrencileri staj süreçlerini öğrenciler, fakültedeki staj sorumluları ve iş yerlerindeki staj sorumlularının süreçlerini kolaylaştırmayı amaçlanmaktadır.


## Sistem Kullanıcı Türleri
- Öğrenci
- Fakülte Görevlisi
- Firma Görevlisi


## Sistem Bileşenleri
- Frontend (Angular)
- Backend (NodeJS Express)
- MySQL


## Sistem Gereklilikleri Yükleme
Proje çalışması için gereklilikler:
```
Node.js 18 veya daha üst bir versiyonu
Angular CLI
LibreOffice
```

## İndirme Bağlantıları
[NodeJS](https://nodejs.org/en/download/) <br>
[Angular CLI](https://angular.io/cli) <br>
[LibreOffice](https://www.libreoffice.org/download/download-libreoffice/)

## Proje Gerekliliklerini Yükleme
```cmd
npm install -g @angular/cli@17
```
```cmd
cd backend 
> npm install
```
```cmd
cd frontend 
> npm install
```

## Backend Çalıştırma İşlemi
`backend/app/config/db.js` içeriğinde yer alan `veritabani_ismi`, `veritabani_kullanici_adi`, `veritabani_kullanici_sifresi`, `veritabani_host_baglantisi` bilgileri düzenlendikten ve `veritabani_ismi`'ne sahip bir veritabanı oluşturduktan sonra `backend/index.js` içerisinde yer alan 
```js
const PORT  
 ```
 alanı istenilen porta göre düzenlenmelidir. Mevcut port numarası `8080` olarak belirlenmiştir. Bu işlemden sonra;

```cmd
cd backend
> node index.js
```
Komutları çalıştırılır. Bu komut sonrasında veri tabanı bağlantısı sağlandıktan sonra gerekli veritabanı tabloları oluşturulur.

## Frontend Çalıştırma İşlemi
`backend/index.js` içerisinde yer alan port bilgisini düzenledikten sonra `frontend/src/app/environments/environment.ts`'ta bulunan `api: "http://localhost:8080/api"` api'ın port bilgisinin de aynı port numarası ile düzenlenmesi gerekmektedir. Bu işlemden sonra `backend/app/config/mail.js` içerisinde yer alan `sendgrid_api_key` alanına Sendgrid üzerinden alınan api key yerleştirilmeli ve yorum satırı iptal edilmelidir. Bu işlemden sonra;

```cmd
cd frontend
> ng serve
```
komutları çalıştırıldıktan sonra tarayıcınzda `http://localhost:4200` adresini açarak sistemin çalışıp çalışmadığını kontrol edebilirsiniz. (4200 port numarası Angular CLI tarafından belirlenmetedir. Farklı bir port üzerinden serve işlemi yapmak isterseniz serve komutu ilke birlikte `--port <port numarası>` flag'ini kullanabilirsiniz.)

## Frontend Build İşlemi
Frontend kısmı bir sunucuda çalıştırılmak istendiğinde `ng serve` komutu yerine build alınıp sunucuya yüklenmesi tercih edilmelidir. 
```cmd
cd frontend
> ng build
```
Komutları sonrasında `frontend/dist` dizini içerisindeki dosya ve dizinler sunucuya yüklenerek kullanılabilir. 
