import { UQCal } from "./UQCal.js";
import { getHijriMonthName, normalizeLanguage } from "../locales/index.js";

/**
 * Hijri Engine
 * Based on the Umm Al-Qura Astronomical System
 */
export class HijriDateCalculator {
  constructor(options = {}) {
    this.options = {
      language: "en",
      dayChangeAtMidnight: true,
      ...options,
    };
  }

  /**
   * Core Calculation: Gregorian to Umm Al-Qura
   */

  gregorianToHijri(year, month, day, language = null) {
    try {
      const gregorianDate = new Date(year, month - 1, day);
      const converter = new UQCal(gregorianDate);
      converter.convert((type = "umm"));

      const hijriDateStr = converter.getHijriDate();
      const langKey = language || "en"; // Simplified
      const monthName = getHijriMonthName(converter.Hmonth, langKey);

      return {
        success: true,
        day: converter.Hday,
        month: converter.Hmonth,
        monthName: monthName,
        year: converter.Hyear,
        fullDate: `${converter.Hday} ${monthName} ${converter.Hyear}`,
        hijriDate: hijriDateStr,
        gregorianDate: `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  getCurrentHijriDate(language = null, dayChangeAtMidnight = null) {
    const lang = language || this.options.language;
    const dayChange =
      dayChangeAtMidnight !== null
        ? dayChangeAtMidnight
        : this.options.dayChangeAtMidnight;

    const now = new Date();
    // Use local time but allow for 18:00 (Sunset) day change
    let date = new Date(now);

    if (!dayChange && now.getHours() >= 18) {
      date.setDate(date.getDate() + 1);
    }

    return this.gregorianToHijri(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      lang
    );
  }
}

// Named Exports for Functional Use
export function gregorianToHijri(year, month, day, language = "en") {
  const calc = new HijriDateCalculator({ language });
  return calc.gregorianToHijri(year, month, day, language);
}

export function getCurrentHijriDate(options = {}) {
  const calc = new HijriDateCalculator(options);
  return calc.getCurrentHijriDate(
    options.language,
    options.dayChangeAtMidnight
  );
}

export default HijriDateCalculator;
