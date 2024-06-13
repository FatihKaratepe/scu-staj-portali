import { Component } from '@angular/core';

interface SSS {
  title: string,
  content: string
}

@Component({
  selector: 'app-staj-sikca-sorulan-sorular',
  templateUrl: './staj-sikca-sorulan-sorular.component.html',
  styleUrls: ['./staj-sikca-sorulan-sorular.component.scss']
})
export class StajSikcaSorulanSorularComponent {
  sss: SSS[] = [
    {
      title: 'Staj işlemlerine nasıl başlayacağım?',
      content: `Soldaki menüde yer alan <strong>Staj Başvurusu</strong> butonuna tıklayarak staj başvuru işlemine başlayabilirsiniz.`
    },
    {
      title: 'Staj komisyonu kimlerden oluşur?',
      content: `Staj komisyonu bölüm başkanı ile birlikte 3 kişiden oluşur.
      <ul>
          <li>Doç. Dr. Hidayet Takçı</li>
          <li>Dr. Öğr. Üyesi Emre Delibaş</li>
          <li>Arş. Gör. A. Fırat YELKUVAN</li>
      </ul>`
    },
    {
      title: 'Staj için sorularımı kime sorabilirim?',
      content: `Soruların cevabını web sitesinde bulamadıysanız, <a href="mailto:bilmuhstaj@cumhuriyet.edu.tr">bilmuhstaj@cumhuriyet.edu.tr</a> adresine mail atınız.`
    },
    {
      title: 'Staj yerim yazılım firması ama mühendis yok, staj kabul edilir mi?',
      content: `Hayır. Firmada mühendis olma zorunluluğu vardır.`
    },
    {
      title: 'Staj yerinde mühendis olduğunu kontrol ediyor musunuz?',
      content: `Evet. Firmanın web sitesinden, sosyal medya adreslerinden veya bizzat telefonla arayarak teyit ediyoruz.`
    },
    {
      title: 'Devam zorunluluğu olan dersim var, dönem içinde staj yapabilir miyim?',
      content: `Hayır, yapamazsınız.`
    },
    {
      title: 'Devam zorunluluğu olan dersim kalmadı, dönem içinde staj yapabilir miyim?',
      content: `Bitirme Ödevi haricinde dersi kalan öğrenciler, dönem içerisinde staj yapamazlar.`
    },
    {
      title: 'Ara tatilde (Ocak-Şubat) staj yapabilir miyim?',
      content: `Sınav dışında kalan haftalarda yapabilirsiniz.`
    },
    {
      title: 'Tek dersten sınavım (final/bütünleme) kaldı, sadece o günü çıkarsam olur mu?',
      content: `Hayır, olmaz. Sınav (final ve bütünleme) haftalarında staj yapılamaz.`
    },
    {
      title: 'Stajımı bitirdim, mezun durumundayım, ne yapmalıyım?',
      content: `Defterinizi imza karşılığı bölüm sekreterliğine teslim edip, mezun durumunda olduğunuzu staj komisyonuna bildiriniz.
      <br>
      En geç 1 hafta içinde staj sonuçlarınız sisteme girilir.`
    },
    {
      title: 'Dikey/yatay geçiş ile geldim, eski okulumdaki stajım sayılır mı?',
      content: `Hayır, sayılmaz.`
    },
    {
      title: 'Bir iş yerinde en fazla ne kadar staj yapabilirim?',
      content: `Aynı iş yerinde en fazla 30 gün yapabilirsiniz.`
    },
    {
      title: 'Bir iş yerinin farklı birimlerinde iki staj yapabilir miyim?',
      content: `Hayır, yapamazsınız.`
    },
    {
      title: 'Mezuniyet için sadece bitirme ödevim ve ... günlük stajım kaldı. Güz/Bahar dönemi içinde stajımı yapabilir miyim?',
      content: `Devam zorunluluğunuz yoksa staj yapabilirsiniz.`
    },
    {
      title: 'Tüm derslerimi verdim, mezun durumundayım, sadece stajım kaldı ama 45 günün tamamı duruyor. Hepsini tek bir kurumda/şirkette yapabilir miyim?',
      content: `Yukarıda belirtilen durumda iseniz tek bir yerde yapabilirsiniz aksi taktirde 2 ayrı staj yapmanız beklenmektedir.`
    }
  ]
}
