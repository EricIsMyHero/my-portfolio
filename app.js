"use strict";

const projectDetails = {
  unec: {
    title: "UNEC Students Hub",
    category: "01 / TƏHSİL & MƏHSULDARLIQ",
    intro:
      "UNEC tələbə icması üçün müstəqil, açıq mənbəli platforma. İmtahana hazırlıq materiallarını və gündəlik tələbə alətlərini vahid məkanda birləşdirir. Universitetin rəsmi platforması deyil.",
    demo: "https://unecstudentshub.com",
    code: "https://github.com/EricIsMyHero/ericismyhero.github.io",
    sections: [
      {
        title: "Hansı ehtiyaca cavab verir?",
        text: "Material axtarışı, imtahana hazırlıq və təhsil planlamasını ayrı-ayrı səhifələr arasında bölmək əvəzinə bir interfeysdə təqdim edir. Layihənin hazırkı quruluşunda kurs və fənn üzrə naviqasiya, material detalları və paylaşma keçidləri var.",
      },
      {
        title: "Əsas imkanlar",
        items: [
          "PDF materialları, fənn filtrləri və cavabların təhlili ilə hazırlıq testləri.",
          "GPA kalkulyatoru, ixtisas planı, Pomodoro taymeri və imtahan geri sayımı.",
          "Azərbaycan və ingilis dilləri, AI köməkçi, fərdi panel və nailiyyətlər.",
          "Material istəkləri, cavab mövzuları, fayl əlavələri və bildiriş inteqrasiyası.",
        ],
      },
      {
        title: "Texniki quruluş",
        text: "Framework istifadə etməyən JavaScript interfeysi və hash əsaslı naviqasiya. Firebase hesab və məlumat xidmətləri, Vercel Functions server funksiyaları, Cloudflare R2 fayl saxlanması üçün istifadə olunur. PWA manifesti və bildirişlər üçün service worker mövcuddur.",
      },
      {
        title: "Əhatə dairəsi",
        text: "Tələbə resursları, istifadəçi axınları, mobil və masaüstü interfeys, məlumat inteqrasiyaları. AI, bildiriş və digər server funksiyaları yayımlanmış xidmətlərin konfiqurasiyasından asılıdır; bütün imkanlar sadəcə statik səhifəni açmaqla işləmir.",
      },
    ],
  },
  kadr: {
    title: "K.A.D.R",
    category: "02 / MEDİA İNTERFEYSİ",
    intro:
      "“Sənin kadrın. Sənin dünyan.” Şəxsi video kolleksiyasını gəzmək, axtarmaq və yenidən izləmək üçün Azərbaycan dilində hazırlanmış media interfeysi.",
    demo: "https://ericismyhero.github.io/k.a.d.r/",
    code: "https://github.com/EricIsMyHero/k.a.d.r",
    sections: [
      {
        title: "İstifadəçi təcrübəsi",
        text: "Şaquli video axını, ayrıca böyük pleyer və etiketlər əsasında axtarış. Klaviatura ilə videolar arasında keçmək, oynatmanı idarə etmək və pleyeri Escape ilə bağlamaq mümkündür.",
      },
      {
        title: "Əsas imkanlar",
        items: [
          "Qarışıq sıra, ən yeni videolar və sevimlilər filtri.",
          "Video başlığı və etiketi üzrə axtarış, kateqoriya görünüşü.",
          "Sevimlilər və izləmə tarixçəsinin cari brauzerdə saxlanması.",
          "Konkret video üçün paylaşma keçidi və tənzimlənən media mənbəyi.",
        ],
      },
      {
        title: "Texniki quruluş",
        text: "HTML, CSS, ES modulu kimi JavaScript və JSON kataloqu. Media HTML5 Video ilə göstərilir; Cloudflare R2 mənbəyindən yüklənir. LocalStorage sevimliləri, tarixçəni və səs seçimini saxlayır. Hesab və ayrıca server tətbiqi tələb etmir.",
      },
      {
        title: "Mühüm məqam",
        text: "Kolleksiya ictimai media mənbəyindən oxunur. İnterfeys girişlə qorunma və ya cihazlararası sinxronlaşdırma yaratmır; şəxsi seçimlər istifadəçinin brauzerində qalır.",
      },
    ],
  },
  arcade: {
    title: "Əli’s Arcade",
    category: "03 / BRAUZER OYUNLARI",
    intro:
      "Bir keçiddən fərqli oyunlara daxil olmaq üçün retro arcade üslubunda hazırlanmış kolleksiya. mini-games reposunda hər oyun ayrıca qovluqda saxlanır.",
    demo: "https://ericismyhero.github.io/mini-games/",
    code: "https://github.com/EricIsMyHero/mini-games",
    sections: [
      {
        title: "Kolleksiyada nələr var?",
        items: [
          "Snake — klassik ilan oyunu.",
          "Card Battle və Boss Chess — kart və şahmat mövzulu oyunlar.",
          "System.exe və Night Shift — ayrıca oyun təcrübələri.",
          "Tarazlıq və Bağban — kolleksiyanın digər iki oyunu.",
        ],
      },
      {
        title: "Kataloqun quruluşu",
        text: "games.json oyun başlığını, işarəsini, yolunu və statusunu saxlayır. JavaScript bu məlumatdan oyun kartlarını yaradır. “Tezliklə” statuslu Flappy Bird və Memory Card hazır oyun sayına daxil edilmir.",
      },
      {
        title: "Texniki yanaşma",
        text: "Statik HTML, CSS və JavaScript. Ayrı oyun səhifələri müstəqil inkişaf etdirilə bilər. Kataloq yeni oyunu məlumat siyahısına əlavə etməklə genişlənir; əsas səhifədə ayrıca kart yazmağa ehtiyac qalmır.",
      },
      {
        title: "Fokus",
        text: "Oyun məntiqi, interaktiv idarəetmə və ardıcıl vizual təqdimat. Yeddi mövcud oyunu birləşdirən sadə giriş nöqtəsi.",
      },
    ],
  },
};

const menu = document.querySelector("#main-nav");
const menuToggle = document.querySelector(".menu-toggle");
function closeMenu() {
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
});
menu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 641px)").addEventListener("change", closeMenu);

const dialog = document.querySelector("#project-dialog");
let dialogTrigger;
function openProject(key, trigger) {
  const project = projectDetails[key];
  if (!project) return;
  dialogTrigger = trigger;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-category").textContent = project.category;
  document.querySelector("#dialog-intro").textContent = project.intro;
  document.querySelector("#dialog-demo").href = project.demo;
  document.querySelector("#dialog-code").href = project.code;
  const sections = project.sections.map((section) => {
    const block = document.createElement("section");
    block.className = "dialog-section";
    const title = document.createElement("h3");
    title.textContent = section.title;
    block.append(title);
    if (section.items) {
      const list = document.createElement("ul");
      section.items.forEach((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        list.append(item);
      });
      block.append(list);
    } else {
      const text = document.createElement("p");
      text.textContent = section.text;
      block.append(text);
    }
    return block;
  });
  document.querySelector("#dialog-body").replaceChildren(...sections);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("dialog-open");
  dialog.querySelector(".dialog-close").focus();
}
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () =>
    openProject(button.dataset.project, button),
  );
});
dialog
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  dialogTrigger?.focus();
});

const archiveCards = [...document.querySelectorAll(".archive-card")];
const filters = [...document.querySelectorAll("[data-filter]")];
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    archiveCards.forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
    });
    const count = archiveCards.filter((card) => !card.hidden).length;
    document.querySelector("#filter-status").textContent =
      `${count} layihə göstərilir`;
  }),
);

const emailButton = document.querySelector("#copy-email");
let copyTimer;
emailButton.addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  clearTimeout(copyTimer);
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText("ericismyhero2467@gmail.com");
    status.textContent = "E-poçt ünvanı kopyalandı.";
  } catch {
    status.textContent =
      "Kopyalama alınmadı. Ünvanı seçib əl ilə kopyalaya bilərsən.";
  }
  copyTimer = setTimeout(() => {
    status.textContent = "";
  }, 6000);
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
// Content and ordinary links remain available when JavaScript is disabled.
document.documentElement.classList.add("js-ready");
