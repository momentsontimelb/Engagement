// =====================================================
// EDIT ME: everything about the invitation lives here.
// =====================================================
const INVITATION = {
  waxInitials: "A & L",        // initials on the wax seal, e.g. "S & A"
  nameOne: "Abdulrhman",       // first name, big heading line 1
  nameOneAr: "عبد الرحمن",       // first name, big heading line 1
  nameTwo: "Lara",             // second name, big heading line 3  nameOne: "Abdulrhman",       // first name, big heading line 1
  nameTwoAr: "لارا",             // second name, big heading line 3
  subtitle: "Two Hearts, One Love, Endless Joy",
  eventDateTime: "2026-07-26T19:00:00", // countdown target: YYYY-MM-DDTHH:MM:SS

  displayDate: "July 26, 2026",   // shown under the countdown
  displayTime: "8:00 PM",
  venueName: "مطعم واحة السلام",
  cityName: "Saida , Sharhabil",
  cityNameAr: "صيدا ، شرحبيل",

  // Easiest option: paste a Google Maps share link here (Share > Copy link)
  // and it is used as-is. Leave "" to auto-build a search link from
  // venueAddress instead.
  googleMapsUrl: "https://maps.app.goo.gl/wmdYqMfQ6RbbsqK9A",
  venueAddress: "مطعم واحة السلام, Saida, Lebanon"
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
    dateLabel: "Date",
    timeLabel: "Time",
    venueLabel: "Venue",
    cityLabel: "City",
    displayDate: INVITATION.displayDate,
    displayTime: INVITATION.displayTime,
    venueName: INVITATION.venueName,
    cityName: INVITATION.cityName,
    mapButton: "View location on map",
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
    dateLabel: "التاريخ",
    timeLabel: "الوقت",
    venueLabel: "المكان",
    cityLabel: "المدينة",
    displayDate: "الأحد، ٢٦ تموز ٢٠٢٦",
    displayTime: "٨:٠٠ مساءً",
    venueName: INVITATION.venueName,
    cityName: INVITATION.cityNameAr,
    mapButton: "عرض الموقع على الخريطة",
    nameOne: INVITATION.nameOneAr,
    nameTwo: INVITATION.nameTwoAr
  }
};

// =====================================================
// Rendering
// =====================================================
function renderInvitation(data) {
  document.getElementById("waxInitials").textContent = data.waxInitials;
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

  document.getElementById("labelDate").textContent = t.dateLabel;
  document.getElementById("labelTime").textContent = t.timeLabel;
  document.getElementById("labelVenue").textContent = t.venueLabel;
  document.getElementById("labelCity").textContent = t.cityLabel;

  document.getElementById("detailDate").textContent = t.displayDate;
  document.getElementById("detailTime").textContent = t.displayTime;
  document.getElementById("detailVenue").textContent = t.venueName;
  document.getElementById("detailCity").textContent = t.cityName;

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
  initEnvelope();
  initLangToggle();
});
