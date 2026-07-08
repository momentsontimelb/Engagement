// =====================================================
// EDIT ME: everything about the invitation lives here.
// =====================================================
const INVITATION = {
  waxInitials: "A & L",        // initials on the wax seal, e.g. "S & A"
  nameOne: "Abdulrhman",       // first name, big heading line 1
  nameTwo: "Lara",             // second name, big heading line 3
  subtitle: "Two Hearts, One Love, Endless Joy",
  eventDateTime: "2026-09-12T18:00:00", // countdown target: YYYY-MM-DDTHH:MM:SS

  displayDate: "September 12, 2026",   // shown under the countdown
  displayTime: "6:00 PM",
  venueName: "The Grand Garden Hall, Beirut",

  // Easiest option: paste a Google Maps share link here (Share > Copy link)
  // and it is used as-is. Leave "" to auto-build a search link from
  // venueAddress instead.
  googleMapsUrl: "",
  venueAddress: "The Grand Garden Hall, Beirut, Lebanon"
};

// =====================================================
// EDIT ME: Arabic translations. Names/date/time/venue are
// optional — leave blank ("") to fall back to the English
// value from INVITATION above.
// =====================================================
const TRANSLATIONS = {
  en: {
    tapHint: "Tap to open",
    subtitle: INVITATION.subtitle,
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    displayDate: INVITATION.displayDate,
    displayTime: INVITATION.displayTime,
    venueName: INVITATION.venueName,
    mapButton: "View Location on Map",
    nameOne: INVITATION.nameOne,
    nameTwo: INVITATION.nameTwo
  },
  ar: {
    tapHint: "اضغط للفتح",
    subtitle: "قلبان، حب واحد، فرحة لا تنتهي",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    displayDate: "١٢ سبتمبر ٢٠٢٦",
    displayTime: "٦:٠٠ مساءً",
    venueName: "قاعة الحديقة الكبرى، بيروت",
    mapButton: "عرض الموقع على الخريطة",
    nameOne: INVITATION.nameOne,
    nameTwo: INVITATION.nameTwo
  }
};

// =====================================================
// Rendering
// =====================================================
function renderInvitation(data) {
  document.getElementById("waxInitials").textContent = data.waxInitials;

  const mapButton = document.getElementById("mapButton");
  mapButton.href = data.googleMapsUrl && data.googleMapsUrl.trim()
    ? data.googleMapsUrl.trim()
    : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data.venueAddress);
}

// =====================================================
// Language switching (EN / AR)
// =====================================================
let currentLang = "en";

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;
  currentLang = lang;

  document.getElementById("tapHint").textContent = t.tapHint;
  document.getElementById("nameOne").textContent = t.nameOne;
  document.getElementById("nameTwo").textContent = t.nameTwo;
  document.getElementById("inviteSubtitle").textContent = t.subtitle;

  document.getElementById("cdLabelDays").textContent = t.days;
  document.getElementById("cdLabelHours").textContent = t.hours;
  document.getElementById("cdLabelMinutes").textContent = t.minutes;
  document.getElementById("cdLabelSeconds").textContent = t.seconds;

  document.getElementById("detailDate").textContent = t.displayDate;
  document.getElementById("detailTime").textContent = t.displayTime;
  document.getElementById("detailVenue").textContent = t.venueName;
  document.getElementById("mapButtonLabel").textContent = t.mapButton;

  const isArabic = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", isArabic);

  document.getElementById("langToggle").textContent = isArabic ? "AR" : "EN";
}

// =====================================================
// Floating hearts decoration
// =====================================================
function scatterHearts(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "heart-item";

    const size = 14 + Math.floor(pseudoRandom(i, 1) * 20);
    const top = pseudoRandom(i, 2) * 90;
    const left = pseudoRandom(i, 3) * 90;
    const delay = pseudoRandom(i, 4) * 4;
    const duration = 4 + pseudoRandom(i, 5) * 4;

    wrapper.style.width = size + "px";
    wrapper.style.height = size + "px";
    wrapper.style.top = top + "%";
    wrapper.style.left = left + "%";
    wrapper.style.animationDelay = delay + "s";
    wrapper.style.animationDuration = duration + "s";

    wrapper.innerHTML = '<svg><use href="#heart-outline"/></svg>';
    container.appendChild(wrapper);
  }
}

// deterministic pseudo-random so layout is stable across reloads (no Math.random dependency issues)
function pseudoRandom(index, salt) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// =====================================================
// Countdown timer
// =====================================================
function startCountdown(targetDateTime) {
  const target = new Date(targetDateTime).getTime();
  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minutesEl = document.getElementById("cdMinutes");
  const secondsEl = document.getElementById("cdSeconds");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
}

// =====================================================
// Envelope -> Invitation transition
// =====================================================
function initEnvelope() {
  const envelopeScreen = document.getElementById("envelopeScreen");

  function open() {
    if (envelopeScreen.classList.contains("opened")) return;
    envelopeScreen.classList.add("opened");
  }

  envelopeScreen.addEventListener("click", open);
}

// =====================================================
// Language toggle
// =====================================================
function initLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    applyLanguage(currentLang === "en" ? "ar" : "en");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderInvitation(INVITATION);
  applyLanguage("en");
  scatterHearts("heartsEnvelope", 6);
  scatterHearts("heartsInvite", 5);
  startCountdown(INVITATION.eventDateTime);
  initEnvelope();
  initLangToggle();
});
