# AliVerse Studio — Əlinin portfeli

Azərbaycan dilində şəxsi portfel. Təhsil platformaları, media interfeysləri və brauzer oyunlarından ibarət **10 layihə** və loqoları ilə **12 sosial profil** təqdim edir.

## Lokal işə salmaq

Python 3 kifayətdir; sayt üçün paket quraşdırmaq və build etmək lazım deyil.

```bash
cd my-portfolio
python3 -m http.server 8000 --bind 127.0.0.1
```

Brauzerdə `http://127.0.0.1:8000` ünvanını açın. Fayllar istənilən statik hostinqdə, o cümlədən GitHub Pages-də işləyir. Aktivlər nisbi yollarla yüklənir; sayt repo alt yolunda da işləyə bilər.

## Avtomatik yoxlamalar

Node.js 20+ və Python 3 tələb olunur. Node paketləri yalnız testlər üçündür.

```bash
npm ci
npx playwright install chromium
npm test
```

Mühitdə `/usr/bin/chromium` varsa, testlər avtomatik ondan istifadə edir və ayrıca brauzer yükləməyə ehtiyac yoxdur. Başqa Chromium yolu üçün `CHROMIUM_PATH` dəyişəni verilə bilər. Minimal Linux mühitində Playwright brauzerinin sistem kitabxanaları üçün `npx playwright install --with-deps chromium` lazım ola bilər.

Testlər öz lokal serverini **8765** portunda başladır. Masaüstü və mobil görünüşlərdə aşağıdakılar yoxlanılır:

- Səhifənin, şəkillərin və JSON məlumatının yüklənməsi; JavaScript xətalarının olmaması.
- Layihə arxivinin filtrləri və nəticənin elan edilməsi.
- Üç layihənin ətraflı pəncərələri, klaviatura fokusu, Escape və bağlama düyməsi.
- Mobil menyu və səhifədaxili naviqasiya.
- E-poçtun kopyalanmasının uğurlu və icazə verilməyən ssenariləri.
- JavaScript söndürüləndə əsas məzmun və keçidlər.
- 320–1920 px ekranlarda üfüqi daşmanın olmaması.
- Bütün sosial profillərin görünməsi, lokal loqoların yüklənməsi və JSON ilə keçid uyğunluğu.
- Əsas layihələrin sırası və etiket / əsas mətn ölçülərinin oxunaqlılığı.
- Giriş və scroll animasiyaları, irəliləyiş xətti və azaldılmış hərəkət seçiminin işləməsi.
- axe ilə avtomatik WCAG 2 A/AA və WCAG 2.1 AA yoxlamaları. Bu, tam əlçatanlıq auditini əvəz etmir.

## Fayllar

| Fayl         | Məzmun                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| `index.html` | Semantik, JavaScript olmadan da oxunan səhifə və layihə kartları       |
| `styles.css` | Dizayn sistemi, responsive görünüş və azaldılmış hərəkət dəstəyi       |
| `app.js`     | Menyu, filtrlər, layihə məlumatları, animasiyalar və e-poçtu kopyalama |
| `links.json` | Layihə keçidləri və lokal loqo yolları ilə bütün sosial profillər      |
| `assets/`    | Lokal şrift, lisenziya, favicon, ekran görüntüləri və paylaşma şəkli   |
| `tests/`     | Playwright funksional və əlçatanlıq yoxlamaları                        |

## Layihəni yeniləmək

Kartın mətnini və keçidlərini `index.html` daxilində dəyişin. Ətraflı pəncərələrdəki məlumatlar `app.js` faylının `projectDetails` obyektindədir. Layihə əlavə və ya silindikdə `links.json`, arxiv filtr sayları və “Haqqımda” bölməsindəki ümumi sayı da uyğunlaşdırın.

Sosial paylaşma məlumatları `index.html` daxilindəki Open Graph metadatasındadır. Fərqli domenə köçürülərsə, `og:image` ünvanını yeniləyin. `assets/social-preview.png` paylaşma üçün hazırlanmış 1200 × 630 px şəkildir.

Əlaqə forması və server tərəfi yoxdur. E-poçt keçidi istifadəçinin poçt proqramını açır. Sayt özü analitika, cookie və ya istifadəçi məlumatı toplamır. Şrift və görüntülər lokal saxlanır; portfelin görünüşü üçün üçüncü tərəf sorğusu tələb olunmur.

## Seçilmiş layihələr

- [UNEC Students Hub](https://github.com/EricIsMyHero/ericismyhero.github.io): akademik resurslar və tələbə alətləri. [Sayt](https://unecstudentshub.com)
- [Clash-A-Mana](https://github.com/EricIsMyHero/oyun): kart arxivi, döyüş və Survival rejimi olan oyun kainatı.
- [K.A.D.R](https://github.com/EricIsMyHero/k.a.d.r): şəxsi video kolleksiyası üçün interfeys.

[Əli’s Arcade](https://github.com/EricIsMyHero/mini-games) digər yeddi layihədən biri kimi arxivdə saxlanır.

Ekran görüntülərinin mənbələri və şrift lisenziyası: [assets/README.md](assets/README.md).

## Sosial profillər və hərəkət

TikTok, Facebook, Instagram, GitHub, Spotify, Telegram, YouTube, Threads, X, Reddit, Discord və Pinterest profilləri `#socials` bölməsində gizli menyusuz göstərilir. Profil əlavə edərkən həm `index.html` kartını, həm də `links.json` daxilindəki `social` qeydini yeniləyin. Loqolar `assets/social/` qovluğunda saxlanır və xarici ikon servisinə sorğu getmir.

Əsas mətnlər ekran ölçüsündən asılı olaraq 14–16 px, köməkçi etiketlər ən az 12 px-dir. Giriş, salamlaşma, sürüşdürmə ilə görünmə, kart hover və dialoq açılma effektləri var. Dekorativ giriş hərəkətləri 4.5 saniyədən gec olmayaraq bitir; davamlı avtomatik animasiya yoxdur. `prefers-reduced-motion: reduce` seçimi olduqda hərəkət söndürülür. Mətnlər animasiya başlamadan da sənəddədir və JavaScript söndürüləndə görünür.
