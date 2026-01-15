import { getLocale } from "../locales/index.js";

// Direct port from Kotlin evenMuslim function
export function getIslamicEvents(
  monthHijri,
  dayHijri,
  weekIndex,
  locale = "en"
) {
  const lang = normalizeEventLanguage(locale);
  const events = [];

  const t = (en, id, ar) => {
    switch (lang) {
      case "id":
        return id;
      case "ar":
        return ar;
      default:
        return en;
    }
  };

  // RAMADAN (Month 9)
  if (monthHijri === 9) {
    switch (dayHijri) {
      case 20:
        events.push(
          t(
            "Preparation for the last 10 days of Ramadan",
            "Persiapan memasuki 10 hari terakhir Ramadhan",
            "الاستعداد للعشر الأواخر من رمضان"
          )
        );
        break;
      case 30:
        events.push(
          t(
            "Preparations for tomorrow's Eid al-Fitr holiday",
            "Persiapan menyambut Idul Fitri besok",
            "الاستعداد لعيد الفطر غداً"
          )
        );
        break;
      default:
        events.push(
          t(
            "Happy observing the fast of Ramadan",
            "Selamat menunaikan ibadah puasa Ramadhan",
            "صوماً مباركاً في شهر رمضان"
          )
        );
    }
  }

  // SHAWWAL (Month 10)
  if (monthHijri === 10) {
    if (dayHijri === 1) {
      events.push(
        t("Happy Eid al-Fitr", "Selamat Hari Raya Idul Fitri", "عيد فطر سعيد")
      );
    } else if (dayHijri === 2) {
      events.push(
        t(
          "Happy Eid al-Fitr (Day 2)",
          "Selamat Hari Raya Idul Fitri (Hari Ke-2)",
          "عيد فطر سعيد (اليوم الثاني)"
        )
      );
    }
  }

  // DHUL HIJJAH (Month 12)
  if (monthHijri === 12) {
    if (dayHijri === 9) {
      events.push(
        t(
          "Happy observing the Sunnah fast of Arafah",
          "Selamat menunaikan puasa sunnah Arafah",
          "صوماً مباركاً لصيام عرفة"
        )
      );
    } else if (dayHijri === 10) {
      events.push(
        t("Happy Eid al-Adha", "Selamat Hari Raya Idul Adha", "عيد أضحى مبارك")
      );
    }
  }

  // MUHARRAM (Month 1)
  if (monthHijri === 1) {
    switch (dayHijri) {
      case 1:
        events.push(
          t("Islamic New Year", "Tahun Baru Islam", "رأس السنة الهجرية")
        );
        break;
      case 2:
        events.push(
          t(
            "Preparation for tomorrow's Tasu'a Sunnah fast",
            "Persiapan puasa sunnah Tasu'a besok",
            "الاستعداد لصيام تاسوعاء غداً"
          )
        );
        break;
      case 3:
        events.push(
          t(
            "Happy observing the Sunnah fast of Tasu'a",
            "Selamat menunaikan puasa sunnah Tasu'a",
            "صوماً مباركاً لصيام تاسوعاء"
          )
        );
        events.push(
          t(
            "Preparation for tomorrow's Ashura Sunnah fast",
            "Persiapan puasa sunnah Asyura besok",
            "الاستعداد لصيام عاشوراء غداً"
          )
        );
        break;
      case 4:
        events.push(
          t(
            "Happy observing the Sunnah fast of Ashura",
            "Selamat menunaikan puasa sunnah Asyura",
            "صوماً مباركاً لصيام عاشوراء"
          )
        );
        break;
    }
  }

  // MAWLID
  if (monthHijri === 3 && dayHijri === 12) {
    events.push(
      t(
        "Mawlid of the Prophet Muhammad ﷺ",
        "Maulid Nabi Muhammad ﷺ",
        "المولد النبوي الشريف"
      )
    );
  }

  // AYYAMUL BIDH (12–15)
  if (dayHijri >= 12 && dayHijri <= 15 && monthHijri !== 9) {
    if (dayHijri === 12) {
      events.push(
        t(
          "Preparation for tomorrow's Ayyamul Bidh fast",
          "Persiapan puasa Ayyamul Bidh besok",
          "الاستعداد لصيام الأيام البيض غداً"
        )
      );
    } else if (dayHijri >= 13 && dayHijri <= 15) {
      events.push(
        t(
          "Happy observing the Sunnah fast of Ayyamul Bidh",
          "Selamat menunaikan puasa sunnah Ayyamul Bidh",
          "صوماً مباركاً لصيام الأيام البيض"
        )
      );
    }
  }

  // WEEKLY SUNNAH FAST (MON–THU)
  if (monthHijri !== 9) {
    if (weekIndex === 1 || weekIndex === 4) {
      events.push(
        t(
          "Preparation for tomorrow's Monday–Thursday Sunnah fast",
          "Persiapan puasa sunnah Senin–Kamis besok",
          "الاستعداد لصيام الاثنين والخميس غداً"
        )
      );
    } else if (weekIndex === 2 || weekIndex === 5) {
      events.push(
        t(
          "Happy observing the Sunnah fast (Monday–Thursday)",
          "Selamat menunaikan puasa sunnah Senin–Kamis",
          "صوماً مباركاً لصيام الاثنين والخميس"
        )
      );
    }
  }

  // Return distinct events
  return [...new Set(events)];
}

export function getEventsForDate(date = new Date(), language = "en") {
  // Convert date to Hijri first, then get events
  const { gregorianToHijri } = require("../core/converter.js");
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

function normalizeEventLanguage(locale) {
  const lang = locale.toLowerCase();
  if (lang === "id") return "id";
  if (lang === "ar") return "ar";
  return "en";
}
