import { UQCal } from "./UQCal.js";
import { getHijriMonthName } from "../locales/index.js";

/**
 * Normalize calendar type parameter
 */
function normalizeCalendarType(type) {
  if (!type || type === "umm" || type === "ummalqura" || type === "u") {
    return "umm";
  }
  if (type === "mabims" || type === "m" || type === "mabim") {
    return "mabims";
  }
  // Default to umm if unknown
  return "umm";
}

/**
 * Hijri Engine
 */
export class HijriDateCalculator {
  constructor(options = {}) {
    this.options = {
      language: "en",
      dayChangeAtMidnight: true,
      calendarType: "umm", // Default to Umm al-Qura
      ...options,
    };
    // Normalize the calendar type
    this.options.calendarType = normalizeCalendarType(
      this.options.calendarType
    );
  }

  /**
   * Core Calculation: Gregorian to Hijri
   */
  gregorianToHijri(year, month, day, language = null, calendarType = null) {
    try {
      const gregorianDate = new Date(year, month - 1, day);

      // Normalize calendar type
      const type = normalizeCalendarType(
        calendarType || this.options.calendarType
      );

      // Use UQCal static method
      const result = UQCal.gregorianToHijri(year, month, day, type);

      const langKey = language || this.options.language;
      const monthName = getHijriMonthName(result.month, langKey);

      return {
        success: true,
        day: result.day,
        month: result.month,
        monthName: monthName,
        year: result.year,
        fullDate: `${result.day} ${monthName} ${result.year}`,
        hijriDate: result.hijriDate,
        gregorianDate: `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`,
        calendarType: type,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get current Hijri date
   */
  getCurrentHijriDate(
    language = null,
    dayChangeAtMidnight = null,
    calendarType = null
  ) {
    const lang = language || this.options.language;
    const dayChange =
      dayChangeAtMidnight !== null
        ? dayChangeAtMidnight
        : this.options.dayChangeAtMidnight;

    // Normalize calendar type
    const type = normalizeCalendarType(
      calendarType || this.options.calendarType
    );

    const now = new Date();
    let date = new Date(now);

    if (!dayChange && now.getHours() >= 18) {
      date.setDate(date.getDate() + 1);
    }

    return this.gregorianToHijri(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      lang,
      type
    );
  }

  /**
   * Convert both calendar types and compare
   */
  compareCalendars(year, month, day, language = null) {
    const ummalqura = this.gregorianToHijri(year, month, day, language, "umm");
    const mabims = this.gregorianToHijri(year, month, day, language, "mabims");

    if (!ummalqura.success || !mabims.success) {
      return {
        success: false,
        error: ummalqura.error || mabims.error,
      };
    }

    return {
      success: true,
      ummalqura,
      mabims,
      difference: {
        dayDiff: mabims.day - ummalqura.day,
        monthDiff: mabims.month - ummalqura.month,
        yearDiff: mabims.year - ummalqura.year,
        isSameDay:
          mabims.day === ummalqura.day &&
          mabims.month === ummalqura.month &&
          mabims.year === ummalqura.year,
      },
    };
  }
}

// Named Exports for Functional Use
export function gregorianToHijri(
  year,
  month,
  day,
  language = "en",
  calendarType = "umm"
) {
  const calc = new HijriDateCalculator({
    language,
    calendarType: normalizeCalendarType(calendarType),
  });
  return calc.gregorianToHijri(year, month, day, language, calendarType);
}

export function getCurrentHijriDate(options = {}) {
  const calc = new HijriDateCalculator({
    ...options,
    calendarType: normalizeCalendarType(options.calendarType),
  });
  return calc.getCurrentHijriDate(
    options.language,
    options.dayChangeAtMidnight,
    options.calendarType
  );
}

export function compareCalendars(year, month, day, language = "en") {
  const calc = new HijriDateCalculator({ language });
  return calc.compareCalendars(year, month, day, language);
}

export default HijriDateCalculator;
