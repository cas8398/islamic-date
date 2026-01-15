export const locales = {
  en: "en",
  ar: "ar",
  id: "id",
  jv: "jv",
};

export function normalizeLanguage(lang) {
  if (!lang) return "en";
  const l = lang.toLowerCase().trim();

  // 1. Direct match or Prefix match (e.g., 'en-US' -> 'en')
  if (locales[l]) return l;
  const shortCode = l.split("-")[0];
  if (locales[shortCode]) return shortCode;

  // 2. Map Aliases
  if (shortCode === "in" || shortCode === "ms") return "id";
  if (["ur", "fa", "ps", "ku", "sd", "ug"].includes(shortCode)) return "ar";

  return "en";
}

export function getLocale(lang = "en") {
  const normalized = normalizeLanguage(lang);
  return locales[normalized];
}

export function getHijriMonthName(monthNumber, language = "en") {
  // monthNumber is 1-based (1 = Muharram, 12 = Dzulhijjah)
  const monthIndex = monthNumber - 1;

  const monthNames = {
    en: [
      "Muharram",
      "Safar",
      "Rabiul Awal",
      "Rabiul Akhir",
      "Jumadil Awal",
      "Jumadil Akhir",
      "Rajab",
      "Sya'ban",
      "Ramadhan",
      "Syawal",
      "Dzulqa'dah",
      "Dzulhijjah",
    ],
    ar: [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الآخر",
      "جمادى الأولى",
      "جمادى الآخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ],
    id: [
      "Muharram",
      "Safar",
      "Rabiul Awal",
      "Rabiul Akhir",
      "Jumadil Awal",
      "Jumadil Akhir",
      "Rajab",
      "Sya'ban",
      "Ramadhan",
      "Syawal",
      "Dzulkaidah",
      "Dzulhijjah",
    ],
    jv: [
      "Sura",
      "Sapar",
      "Mulud",
      "Bakda Mulud",
      "Jumadil Awal",
      "Jumadil Akhir",
      "Rejeb",
      "Ruwah",
      "Pasa",
      "Sawal",
      "Sela",
      "Besar",
    ],
  };

  const lang = monthNames[language] ? language : "en";
  return monthNames[lang][monthIndex] || `Month ${monthNumber}`;
}

export const supportedLanguages = Object.keys(locales);
