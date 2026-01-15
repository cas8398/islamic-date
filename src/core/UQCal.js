/*  
Credit:
Original code: http://www.staff.science.uu.nl/~gent0113/islam/ummalqura_converter.htm
*/
import { UMMALQURA_DAT } from "./UmmData.js";
import { MABIMS_DAT } from "./MabimsDat.js";

export class UQCal {
  constructor(d) {
    const date = d ? new Date(d) : new Date();
    this.Gday = date.getDate();
    this.Gmonth = date.getMonth();
    this.Gyear = date.getFullYear();
    this.Hday = null;
    this.Hmonth = null;
    this.Hyear = null;
    this.ilunnum = null;
    this.Hlength = null;
    this.julday = null;
    this.wkday = null;
  }

  gmod(n, m) {
    return ((n % m) + m) % m;
  }

  convert(type = "umm") {
    let { Gday: day, Gmonth: month, Gyear: year } = this;

    // Adjust month
    let m = month + 1;
    let y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    const a = Math.floor(y / 100);
    let jgc = a - Math.floor(a / 4) - 2;

    let cjdn =
      Math.floor(365.25 * (y + 4716)) +
      Math.floor(30.6001 * (m + 1)) +
      day -
      jgc -
      1524;

    const a2 = Math.floor((cjdn - 1867216.25) / 36524.25);
    jgc = a2 - Math.floor(a2 / 4) + 1;
    const b = cjdn + jgc + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    month = Math.floor((b - d) / 30.6001);
    day = b - d - Math.floor(30.6001 * month);

    if (month > 13) month -= 12;
    month -= 1;
    year = c - 4716;

    this.Gday = day;
    this.Gmonth = month;
    this.Gyear = year;

    const wd = this.gmod(cjdn + 1, 7) + 1;
    this.julday = cjdn;
    this.wkday = wd - 1;

    const mcjdn = cjdn - 2400000;

    // Choose dataset based on type
    let DATASET, EPOCH;
    if (type === "mabims") {
      DATASET = MABIMS_DAT;
      EPOCH = 16261 + 1431 * 12; // Adjust epoch for MABIMS
    } else {
      DATASET = UMMALQURA_DAT;
      EPOCH = 16261;
    }

    // Find correct month
    let i = 0;
    if (mcjdn < DATASET[0]) {
      i = 0;
    } else if (mcjdn >= DATASET[DATASET.length - 1]) {
      i = DATASET.length - 1;
    } else {
      for (i = 0; i < DATASET.length - 1; i++) {
        if (mcjdn >= DATASET[i] && mcjdn < DATASET[i + 1]) {
          break;
        }
      }
    }

    // Calculate Hijri date
    const iln = i + EPOCH;
    const totalLunarMonths = iln;
    const iy = Math.floor((totalLunarMonths - 1) / 12) + 1;
    const im = totalLunarMonths - 12 * Math.floor((totalLunarMonths - 1) / 12);

    const monthStart = DATASET[i];
    const nextMonthStart =
      i + 1 < DATASET.length ? DATASET[i + 1] : monthStart + 30;
    const id = mcjdn - monthStart + 1;
    const ml = nextMonthStart - monthStart;

    this.Hday = id;
    this.Hmonth = im;
    this.Hyear = iy;
    this.ilunnum = iln;
    this.Hlength = ml;

    return this;
  }

  getHijriDate() {
    if (!this.Hyear || !this.Hmonth || !this.Hday) return "Invalid";
    return `${this.Hyear}-${String(this.Hmonth).padStart(2, "0")}-${String(
      this.Hday
    ).padStart(2, "0")}`;
  }

  // Static method - simple version
  static gregorianToHijri(year, month, day, type = "umm") {
    try {
      const gregorianDate = new Date(year, month - 1, day);
      const converter = new UQCal(gregorianDate);
      converter.convert(type);

      const hijriDateStr = converter.getHijriDate();

      return {
        success: true,
        day: converter.Hday,
        month: converter.Hmonth,
        year: converter.Hyear,
        hijriDate: hijriDateStr,
        gregorianDate: `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// Optional: Utility function for quick conversion
export const convertToHijri = (date, type = "umm") => {
  const converter = new UQCal(date);
  return converter.convert(type);
};

// Optional: Create and export a singleton instance
export const hijriConverter = new UQCal();
