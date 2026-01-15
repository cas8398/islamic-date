# Islamic Date

**Modern Multi-Calendar Library for Hijri, Gregorian & Javanese Calendars**

> Fast, accurate calendar calculations with Umm Al-Qura Hijri calendar, Islamic events detection, and Javanese calendar support.

[![npm version](https://img.shields.io/npm/v/islamic-date.svg)](https://www.npmjs.com/package/islamic-date)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🌙 **Hijri Calendar** - Umm Al-Qura calendar (Saudi official standard)
- 📅 **Gregorian ↔ Hijri** - Bidirectional date conversion
- 🎋 **Javanese Calendar** - Traditional Javanese calendar system
- 🕌 **Islamic Events** - Automatic detection of Ramadan, Eid, and other significant dates
- 🌍 **Multi-language** - Arabic (ar), Indonesian (id), Javanese (jv), English (en)
- 🚀 **Zero dependencies** - Lightweight and fast
- 📦 **TypeScript support** - Full type definitions included
- 🔄 **ESM & CommonJS** - Works in both module systems

## 📦 Installation

```bash
npm install islamic-date
```

## 🚀 Quick Start

### Basic Usage

```javascript
import { getCurrentHijriDate, getAllCalendars } from "islamic-date";

// Get current Hijri date
const hijri = getCurrentHijriDate({ language: "en" });
console.log(`${hijri.day} ${hijri.monthName} ${hijri.year} H`);
// Output: 15 Rajab 1446 H

// Get all calendars at once
const calendars = getAllCalendars({
  language: "id",
  includeEvents: true,
  includeJawa: true,
});
console.log(calendars.hijriFormatted); // 15 Rajab 1446 H
console.log(calendars.jawaFormatted); // Pahing, 15 Sura 1958 J
```

### CommonJS

```javascript
const { getCurrentHijriDate, getJawaDate } = require("islamic-date");

const today = getCurrentHijriDate({ language: "ar" });
console.log(`${today.day} ${today.monthName} ${today.year} هـ`);
// Output: ١٥ رجب ١٤٤٦ هـ
```

## 📖 API Reference

### Hijri Calendar Functions

#### `getCurrentHijriDate(options)`

Get the current Hijri date with localization support.

```javascript
import { getCurrentHijriDate } from "islamic-date";

const today = getCurrentHijriDate({
  language: "ar",
  dayChangeAtMidnight: true,
});

console.log(today);
// {
//   day: 15,
//   month: 7,
//   year: 1446,
//   monthName: 'رجب',
//   weekIndex: 3
// }
```

**Parameters:**

- `options.language` - Language code: `'ar'`, `'id'`, `'en'` (default: `'en'`)
- `options.dayChangeAtMidnight` - When day changes: `true` for midnight, `false` for sunset (default: `true`)

#### `gregorianToHijri(year, month, day, language)`

Convert Gregorian date to Hijri date.

```javascript
import { gregorianToHijri } from "islamic-date";

const hijri = gregorianToHijri(2024, 3, 11, "ar");
console.log(`${hijri.day} ${hijri.monthName} ${hijri.year} هـ`);
// Output: ١ رمضان ١٤٤٥ هـ
```

**Parameters:**

- `year` - Gregorian year (number)
- `month` - Gregorian month 1-12 (number)
- `day` - Gregorian day 1-31 (number)
- `language` - Language code (string, optional, default: `'en'`)

#### `getHijriDateWithEvents(options)`

Get Hijri date with Islamic events included.

```javascript
import { getHijriDateWithEvents } from "islamic-date";

const dateWithEvents = getHijriDateWithEvents({
  language: "id",
  includeEvents: true,
});

console.log(dateWithEvents.events);
// ['Awal Ramadan'] or [] if no events
```

### Islamic Events

#### `getIslamicEvents(month, day, weekIndex, language)`

Get Islamic events for a specific Hijri date.

```javascript
import { getIslamicEvents } from "islamic-date";

// Ramadan 1st
const events = getIslamicEvents(9, 1, 1, "ar");
console.log(events); // ['بداية رمضان']

// Eid al-Fitr
const eid = getIslamicEvents(10, 1, 1, "en");
console.log(eid); // ['Eid al-Fitr']
```

**Major Islamic Events Detected:**

- 🌙 Ramadan (Month 9)
- 🎉 Eid al-Fitr (Shawwal 1-3)
- 🕋 Day of Arafah (Dhul Hijjah 9)
- 🐑 Eid al-Adha (Dhul Hijjah 10-13)
- 📅 Islamic New Year (Muharram 1)
- ⭐ Mawlid al-Nabi (Rabi' al-Awwal 12)
- 🌟 Lailatul Qadr (Last 10 nights of Ramadan)
- 🌙 Ashura (Muharram 10)

### Javanese Calendar Functions

#### `getJawaDate(date, language)`

Get Javanese calendar date from a Gregorian date.

```javascript
import { getJawaDate } from "islamic-date";

const jawa = getJawaDate(new Date(), "jv");
console.log(`${jawa.dayName}, ${jawa.day} ${jawa.monthName} ${jawa.year} J`);
// Output: Pahing, 15 Sura 1958 J
```

**Parameters:**

- `date` - JavaScript Date object
- `language` - Language code: `'id'`, `'jv'`, `'en'` (default: `'id'`)

**Returns:**

```javascript
{
  day: 15,
  month: 1,
  year: 1958,
  monthName: 'Sura',
  dayName: 'Pahing',
  dayIndex: 3
}
```

#### `getJawaDayFromGregorian(date)`

Get the Javanese day (pasaran) from a Gregorian date.

```javascript
import { getJawaDayFromGregorian, JAWA_DAYS } from "islamic-date";

const dayIndex = getJawaDayFromGregorian(new Date());
console.log(JAWA_DAYS.jv[dayIndex]); // Pahing, Pon, Wage, Kliwon, or Legi
```

### Combined Calendars

#### `getAllCalendars(options)`

Get Gregorian, Hijri, and Javanese calendars in one call.

```javascript
import { getAllCalendars } from "islamic-date";

const all = getAllCalendars({
  language: "id",
  includeEvents: true,
  includeJawa: true,
});

console.log(all);
// {
//   gregorian: '2025-01-14',
//   hijri: { day: 15, month: 7, year: 1446, monthName: 'Rajab', weekIndex: 3 },
//   hijriFormatted: '15 Rajab 1446 H',
//   jawa: { day: 15, month: 1, year: 1958, monthName: 'Sura', dayName: 'Pahing', dayIndex: 3 },
//   jawaFormatted: 'Pahing, 15 Sura 1958 J',
//   events: []
// }
```

#### `supportedLanguages`

Array of supported language codes.

```javascript
import { supportedLanguages } from "islamic-date";

console.log(supportedLanguages);
// ['ar', 'en', 'id', 'jv']
```

## 🌍 Language Support

### Hijri Calendar Languages

| Language   | Code | Example Output  |
| ---------- | ---- | --------------- |
| Arabic     | `ar` | ١٥ رجب ١٤٤٦ هـ  |
| English    | `en` | 15 Rajab 1446 H |
| Indonesian | `id` | 15 Rajab 1446 H |
| Javanese   | `jv` | 15 Rejeb 1446 H |

### Javanese Calendar Languages

| Language   | Code | Example Output         |
| ---------- | ---- | ---------------------- |
| Indonesian | `id` | Pahing, 15 Sura 1958 J |
| Javanese   | `jv` | Pahing, 15 Sura 1958 J |
| English    | `en` | Pahing, 15 Sura 1958 J |

## 🎋 Javanese Calendar System

The Javanese calendar combines:

- **Pasaran** (5-day market cycle): Legi, Pahing, Pon, Wage, Kliwon
- **12 Months**: Sura, Sapar, Mulud, Bakda Mulud, Jumadilawal, Jumadilakir, Rejeb, Ruwah, Pasa, Sawal, Dulkangidah, Besar

### Event Calendar Generator

```javascript
import { getIslamicEvents } from "islamic-date";

function getYearlyEvents(language = "en") {
  const events = [];

  const importantDates = [
    { month: 1, day: 1, name: "Islamic New Year" },
    { month: 3, day: 12, name: "Mawlid" },
    { month: 9, day: 1, name: "Ramadan Begins" },
    { month: 10, day: 1, name: "Eid al-Fitr" },
    { month: 12, day: 9, name: "Arafah" },
    { month: 12, day: 10, name: "Eid al-Adha" },
  ];

  importantDates.forEach(({ month, day }) => {
    const event = getIslamicEvents(month, day, 1, language);
    if (event.length > 0) {
      events.push({ month, day, event: event[0] });
    }
  });

  return events;
}

console.log(getYearlyEvents("ar"));
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Umm Al-Qura calendar algorithm
- Islamic calendar conversion methods
- Javanese calendar traditions

## 📮 Support

- 🐛 Issues: [GitHub Issues](https://github.com/cas8398/islamic-date/issues)
- 📧 Questions: Open a discussion on GitHub

---

Made with ❤️ for the global Muslim and Indonesian communities
