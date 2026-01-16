# Islamic Date

**Modern Multi-Calendar Library for Hijri, Gregorian & Javanese Calendars**

> Fast, accurate calendar calculations with Umm Al-Qura & MABIMS Hijri calendars, Islamic events detection, and Javanese calendar support.

[![npm version](https://img.shields.io/npm/v/islamic-date.svg)](https://www.npmjs.com/package/islamic-date)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🌙 **Hijri Calendar** - Umm Al-Qura (Saudi) & MABIMS (Southeast Asia) calendars
- 📅 **Gregorian ↔ Hijri** - Bidirectional date conversion
- 🎋 **Javanese Calendar** - Traditional Javanese calendar system
- 🕌 **Islamic Events** - Auto-detection of Ramadan, Eid, and major dates
- 🌍 **Multi-language** - Arabic, Indonesian, Javanese, English
- 🚀 **Zero dependencies** - Lightweight and fast
- 📦 **TypeScript support** - Full type definitions

## 📦 Installation

```bash
npm install islamic-date
```

## 🚀 Quick Start

```javascript
import {
  getCurrentHijriDate,
  getAllCalendars,
  CalendarType,
} from "islamic-date";

// Get current Hijri date
const hijri = getCurrentHijriDate({ language: "en" });
console.log(`${hijri.day} ${hijri.monthName} ${hijri.year} H`);

// MABIMS calendar (2010-2030)
const mabims = gregorianToHijri(2024, 3, 11, "id", CalendarType.MABIMS);
if (mabims.success) {
  console.log(`${mabims.day} ${mabims.monthName} ${mabims.year} H`);
}

// All calendars at once
const all = getAllCalendars({
  language: "id",
  includeEvents: true,
  includeJawa: true,
});
console.log(all.hijriFormatted); // 15 Rajab 1446 H
console.log(all.jawaFormatted); // Pahing, 15 Sura 1958 J
```

## 📖 API Reference

### `gregorianToHijri(year, month, day, language?, calendarType?)`

Convert Gregorian to Hijri date.

```javascript
import { gregorianToHijri, CalendarType } from "islamic-date";

// Umm Al-Qura (default)
const hijri = gregorianToHijri(2024, 3, 11, "ar");

// MABIMS (2010-2030 only) - experimental
const result = gregorianToHijri(2024, 3, 11, "id", CalendarType.MABIMS);
if (result.success) {
  console.log(`${result.day} ${result.monthName} ${result.year} H`);
} else {
  console.log(`Error: ${result.error}`);
}
```

**Calendar Types:**

- `CalendarType.UMMALQURA` - Saudi Arabia's official calendar (default)
- `CalendarType.MABIMS` - MABIMS unified calendar (2010-2030) ⚠️ Experimental

**Returns:** `{ success, day, month, year, monthName, weekIndex }` or `{ success: false, error }`

### `getCurrentHijriDate(options)`

Get current Hijri date with localization.

```javascript
const today = getCurrentHijriDate({
  language: "ar", // 'ar' | 'id' | 'en' | 'jv'
  dayChangeAtMidnight: true, // true = midnight, false = sunset
});
```

### `getIslamicEvents(month, day, weekIndex, language)`

Get Islamic events for a Hijri date.

```javascript
const events = getIslamicEvents(9, 1, 1, "ar"); // ['بداية رمضان']
const eid = getIslamicEvents(10, 1, 1, "en"); // ['Eid al-Fitr']
```

**Detected Events:** Ramadan, Eid al-Fitr, Eid al-Adha, Day of Arafah, Islamic New Year, Mawlid, Lailatul Qadr, Ashura

### `getJawaDate(date, language?)`

Get Javanese calendar date.

```javascript
const jawa = getJawaDate(new Date(), "jv");
console.log(`${jawa.dayName}, ${jawa.day} ${jawa.monthName} ${jawa.year} J`);
// Pahing, 15 Sura 1958 J
```

### `getAllCalendars(options)`

Get all calendars in one call.

```javascript
const all = getAllCalendars({
  language: "id",
  includeEvents: true,
  includeJawa: true,
});
// Returns: { gregorian, hijri, hijriFormatted, jawa, jawaFormatted, events }
```

## 🌏 MABIMS Calendar

MABIMS (Brunei-Indonesia-Malaysia-Singapore) unified Islamic calendar for Southeast Asia.

**Limitations:**

- Date range: 2010-2030 only
- Experimental - always check `success` property
- Some dates may be missing

**Usage:**

```javascript
const result = gregorianToHijri(2025, 1, 1, "id", CalendarType.MABIMS);
if (!result.success) {
  // Fallback to Umm Al-Qura
  const fallback = gregorianToHijri(2025, 1, 1, "id");
}
```

## 🌍 Language Support

| Language   | Code | Hijri Example   | Jawa Example           |
| ---------- | ---- | --------------- | ---------------------- |
| Arabic     | `ar` | ١٥ رجب ١٤٤٦ هـ  | -                      |
| English    | `en` | 15 Rajab 1446 H | Pahing, 15 Sura 1958 J |
| Indonesian | `id` | 15 Rajab 1446 H | Pahing, 15 Sura 1958 J |
| Javanese   | `jv` | 15 Rejeb 1446 H | Pahing, 15 Sura 1958 J |

## 💡 Examples

### Yearly Events Generator

```javascript
import { getIslamicEvents } from "islamic-date";

const importantDates = [
  { month: 1, day: 1 }, // Islamic New Year
  { month: 3, day: 12 }, // Mawlid
  { month: 9, day: 1 }, // Ramadan
  { month: 10, day: 1 }, // Eid al-Fitr
  { month: 12, day: 10 }, // Eid al-Adha
];

importantDates.forEach(({ month, day }) => {
  const events = getIslamicEvents(month, day, 1, "en");
  console.log(events);
});
```

### MABIMS Testing

```javascript
const { gregorianToHijri, CalendarType } = require("islamic-date");

for (let year = 2010; year <= 2030; year++) {
  const result = gregorianToHijri(year, 1, 1, "id", CalendarType.MABIMS);
  console.log(
    result.success
      ? `✅ ${year}: ${result.day} ${result.monthName} ${result.year}`
      : `❌ ${year}: ${result.error}`
  );
}
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

Umm Al-Qura calendar algorithm • MABIMS authorities • Javanese calendar traditions

## 📮 Support

🐛 [GitHub Issues](https://github.com/cas8398/islamic-date/issues)

---

Made with ❤️ for the global Muslim and Indonesian communities
