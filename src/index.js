import {
  default as HijriDateCalculator,
  gregorianToHijri,
  getCurrentHijriDate,
} from "./core/converter.js";

import { getIslamicEvents } from "./events/index.js";

import { getLocale, supportedLanguages } from "./locales/index.js";

import {
  getJawaDate,
  getJawaDayFromGregorian,
  JAWA_DAYS,
  JAWA_MONTHS,
} from "./jawa/index.js";

// Re-export everything
export {
  HijriDateCalculator,
  gregorianToHijri,
  getCurrentHijriDate,
  getIslamicEvents,
  getLocale,
  supportedLanguages,
  getJawaDate,
  getJawaDayFromGregorian,
  JAWA_DAYS,
  JAWA_MONTHS,
};

// Main utility function
export function getHijriDateWithEvents(options = {}) {
  const {
    language = "en",
    dayChangeAtMidnight = true,
    includeEvents = true,
  } = options;

  const hijriDate = getCurrentHijriDate({ language, dayChangeAtMidnight });

  if (includeEvents) {
    const events = getIslamicEvents(
      hijriDate.month,
      hijriDate.day,
      hijriDate.weekIndex,
      language
    );
    return { ...hijriDate, events };
  }

  return hijriDate;
}

// Helper function
export function getEventsForDate(date = new Date(), language = "en") {
  const hijriDate = gregorianToHijri(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    language
  );

  return getIslamicEvents(
    hijriDate.month,
    hijriDate.day,
    hijriDate.weekIndex,
    language
  );
}

// Combined function for all calendar systems
export function getAllCalendars(options = {}) {
  const { language = "id", includeEvents = true, includeJawa = true } = options;

  try {
    const hijriDate = getCurrentHijriDate(options);
    const today = new Date();

    const result = {
      gregorian: today.toISOString().split("T")[0], // YYYY-MM-DD format
      hijri: hijriDate,
      hijriFormatted: `${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} H`,
    };

    if (includeEvents) {
      result.events = getIslamicEvents(
        hijriDate.month,
        hijriDate.day,
        hijriDate.weekIndex,
        language
      );
    }

    if (includeJawa) {
      result.jawa = getJawaDate(today, language);
      result.jawaFormatted = `${result.jawa.dayName}, ${result.jawa.day} ${result.jawa.monthName} ${result.jawa.year} AJ`;
    }

    return result;
  } catch (error) {
    console.error("Error in getAllCalendars:", error);
    return {
      error: error.message,
      gregorian: "Error",
      hijriFormatted: "Error",
      jawaFormatted: "Error",
    };
  }
}

// Default export
export default HijriDateCalculator;
