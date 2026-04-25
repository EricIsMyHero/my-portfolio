/* ================================================
   script.js — Premium Portfolio
   ================================================ */

/* ---------- Link məlumatları ----------
   links.json faylından yükləmək üçün fetch istifadə edin.
   Yoxsa aşağıdakı `fallback` obyektini birbaşa redaktə edin.
   ------------------------------------------------ */

const fallback = {
  profile: {
    name: "EricIsMyHero",
    avatar: "profil.jpg",
    bio: "𝑺𝒐𝒚 𝑨𝒍𝒊 ✦ Only u have that magic technique 🪽"
  },
  websites: [
    { title: "Portfolio",  url: "#", icon: "🌐" },
    { title: "Blog",       url: "#", icon: "✍️" },
    { title: "Projects",   url: "#", icon: "🚀" }
  ],
  social: [
    { title: "Instagram",  url: "#", icon: "📸" },
    { title: "Twitter / X",url: "#", icon: "𝕏" },
    { title: "Telegram",   url: "#", icon: "✈️" },
    { title: "GitHub",     url: "#", icon: "🐙" }
  ],
  other: [
    { title: "Donate / Ko-fi", url: "#", icon: "☕" },
    { title: "Contact Me",     url: "#", icon: "💬" }
  ]
};

let allLinks = fallback;

/* ---------- Yükləmə ---------- */
(function init() {
  // links.json varsa yüklə, yoxsa fallback istifadə et
  fetch("links.json")
    .then(res => {
      if (!res.ok) throw new Error("links.json tapılmadı");
      return res.json();
    })
    .then(data => {
      allLinks = data;
      applyProfile();
      showLinks("websites");
    })
    .catch(() => {
      // Fallback data ilə davam et
      applyProfile();
      showLinks("websites");
    });
})();

function applyProfile() {
  const p = allLinks.profile;
  if (!p) return;

  // Ad
  const h1 = document.querySelector("h1");
  if (h1 && p.name) h1.textContent = p.name;

  // Bio
  const bio = document.querySelector(".bio");
  if (bio && p.bio) bio.textContent = p.bio;

  // Avatar
  if (p.avatar) {
    const img = document.querySelector(".avatar");
    if (img) {
      img.src = p.avatar;
      img.alt = p.name || "Profil şəkli";
    }
  }
}

/* ---------- Link göstərmə ---------- */
function showLinks(category, btn) {
  const container = document.getElementById("links");
  if (!container) return;

  const items = allLinks[category];
  if (!items || !Array.isArray(items)) return;

  // Köhnə linkləri sil
  container.innerHTML = "";

  // Tab highlight
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  if (btn) {
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
  } else {
    // İlk tab-ı aktiv et (ilk yüklənmədə)
    const firstTab = document.querySelector(".tab");
    if (firstTab) {
      firstTab.classList.add("active");
      firstTab.setAttribute("aria-selected", "true");
    }
  }

  // Linkləri render et
  items.forEach((link, i) => {
    const a = document.createElement("a");
    a.className = "link-item";
    a.href = link.url || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("role", "listitem");
    a.style.animationDelay = (i * 0.07) + "s";

    // İkon
    const iconEl = document.createElement("div");
    iconEl.className = "link-icon";

    if (link.faIcon) {
      // Font Awesome ikonası (məs: "fa-brands fa-instagram")
      const i = document.createElement("i");
      i.className = link.faIcon;
      iconEl.appendChild(i);
    } else {
      // Emoji ikonası
      iconEl.textContent = link.icon || "🔗";
    }

    // Label
    const labelEl = document.createElement("span");
    labelEl.className = "link-label";
    labelEl.textContent = link.title;

    // Ok
    const arrowEl = document.createElement("span");
    arrowEl.className = "link-arrow";
    arrowEl.setAttribute("aria-hidden", "true");
    arrowEl.textContent = "›";

    a.appendChild(iconEl);
    a.appendChild(labelEl);
    a.appendChild(arrowEl);
    container.appendChild(a);
  });
}

/* ---------- Tema ---------- */
function toggleTheme() {
  const isLight = document.body.classList.toggle("light");
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Saxlanmış temanı tətbiq et
(function applyTheme() {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    const icon = document.getElementById("theme-icon");
    if (icon) icon.className = "fa-solid fa-moon";
  }
})();

/* ---------- Paylaşma ---------- */
function shareMe() {
  const shareData = {
    title: document.querySelector("h1")?.textContent || "My Links",
    text: "Profilimə bax!",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(err => {
      // İstifadəçi ləğv etdisə — xəta göstərmə
      if (err.name !== "AbortError") copyToClipboard();
    });
  } else {
    copyToClipboard();
  }
}

function copyToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.location.href).then(showToast).catch(() => {});
  } else {
    showToast();
  }
}

/* ---------- Toast bildirişi ---------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  if (message) toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}
