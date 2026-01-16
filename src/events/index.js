export function getIslamicEvents(
  monthHijri,
  dayHijri,
  weekIndex,
  locale = "en"
) {
  const lang = normalizeEventLanguage(locale);
  const events = [];

  const t = (en, id, ar, jv) => {
    switch (lang) {
      case "id":
        return id;
      case "ar":
        return ar;
      case "jv":
        return jv;
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
            "الاستعداد للعشر الأواخر من رمضان",
            "Nyamektakaken 10 dinten pungkasan Ramadhan"
          )
        );
        break;
      case 30:
        events.push(
          t(
            "Preparations for tomorrow's Eid al-Fitr holiday",
            "Persiapan menyambut Idul Fitri besok",
            "الاستعداد لعيد الفطر غداً",
            "Nyamektakaken dinten riyaya Idul Fitri benjing"
          )
        );
        break;
      default:
        events.push(
          t(
            "Happy observing the fast of Ramadan",
            "Selamat menunaikan ibadah puasa Ramadhan",
            "صوماً مباركاً في شهر رمضان",
            "Sugeng nindakaken ibadah siyam Ramadhan"
          )
        );
    }

    // LAYLATUL QADR (Last 10 odd nights of Ramadan: 21, 23, 25, 27, 29)
    if (dayHijri >= 21 && dayHijri <= 29 && dayHijri % 2 === 1) {
      events.push(
        t(
          "Night of Power (Laylatul Qadr)",
          "Malam Lailatul Qadr",
          "ليلة القدر",
          "Dalu Laylatul Qadr"
        )
      );
    }
  }

  // SHAWWAL (Month 10)
  if (monthHijri === 10) {
    if (dayHijri === 1) {
      events.push(
        t(
          "Happy Eid al-Fitr",
          "Selamat Hari Raya Idul Fitri",
          "عيد فطر سعيد",
          "Sugeng Riyadi Idul Fitri"
        )
      );
    } else if (dayHijri === 2) {
      events.push(
        t(
          "Happy Eid al-Fitr (Day 2)",
          "Selamat Hari Raya Idul Fitri (Hari Ke-2)",
          "عيد فطر سعيد (اليوم الثاني)",
          "Sugeng Riyadi Idul Fitri (Dinten Kaping kalih)"
        )
      );
    }
  }

  // RAJAB - ISRA MI'RAJ (Month 7, Day 27)
  if (monthHijri === 7 && dayHijri === 27) {
    events.push(
      t(
        "Isra and Mi'raj of the Prophet Muhammad ﷺ",
        "Isra Mi'raj Nabi Muhammad ﷺ",
        "الإسراء والمعراج",
        "Isra Mi'raj Nabi Muhammad ﷺ"
      )
    );
  }

  // DHUL HIJJAH (Month 12)
  if (monthHijri === 12) {
    if (dayHijri === 9) {
      events.push(
        t(
          "Happy observing the Sunnah fast of Arafah",
          "Selamat menunaikan puasa sunnah Arafah",
          "صوماً مباركاً لصيام عرفة",
          "Sugeng nindakaken siyam sunah Arafah"
        )
      );
    } else if (dayHijri === 10) {
      events.push(
        t(
          "Happy Eid al-Adha",
          "Selamat Hari Raya Idul Adha",
          "عيد أضحى مبارك",
          "Sugeng Riyadi Idul Adha"
        )
      );
    }
  }

  // MUHARRAM (Month 1)
  if (monthHijri === 1) {
    switch (dayHijri) {
      case 1:
        events.push(
          t(
            "Islamic New Year",
            "Tahun Baru Islam",
            "رأس السنة الهجرية",
            "Warsa Enggal Islam"
          )
        );
        break;
      case 2:
        events.push(
          t(
            "Preparation for tomorrow's Tasu'a Sunnah fast",
            "Persiapan puasa sunnah Tasu'a besok",
            "الاستعداد لصيام تاسوعاء غداً",
            "Nyamektakaken siyam sunah Tasu'a benjing"
          )
        );
        break;
      case 3:
        events.push(
          t(
            "Happy observing the Sunnah fast of Tasu'a",
            "Selamat menunaikan puasa sunnah Tasu'a",
            "صوماً مباركاً لصيام تاسوعاء",
            "Sugeng nindakaken siyam sunah Tasu'a"
          )
        );
        events.push(
          t(
            "Preparation for tomorrow's Ashura Sunnah fast",
            "Persiapan puasa sunnah Asyura besok",
            "الاستعداد لصيام عاشوراء غداً",
            "Nyamektakaken siyam sunah Asyura benjing"
          )
        );
        break;
      case 4:
        events.push(
          t(
            "Happy observing the Sunnah fast of Ashura",
            "Selamat menunaikan puasa sunnah Asyura",
            "صوماً مباركاً لصيام عاشوراء",
            "Sugeng nindakaken siyam sunah Asyura"
          )
        );
        break;
    }
  }

  // SYA'BAN - NISFU SYA'BAN (Month 8, Day 15)
  if (monthHijri === 8 && dayHijri === 15) {
    events.push(
      t(
        "Mid-Sha'ban (Nisfu Sya'ban)",
        "Pertengahan Sya'ban (Nisfu Sya'ban)",
        "ليلة النصف من شعبان",
        "Tengahing Sya'ban (Nisfu Sya'ban)"
      )
    );
  }

  // MAWLID (Month 3, Day 12)
  if (monthHijri === 3 && dayHijri === 12) {
    events.push(
      t(
        "Mawlid of the Prophet Muhammad ﷺ",
        "Maulid Nabi Muhammad ﷺ",
        "المولد النبوي الشريف",
        "Maulid Nabi Muhammad ﷺ"
      )
    );
  }

  // AYYAMUL BIDH (12–15, excluding Ramadan)
  if (dayHijri >= 12 && dayHijri <= 15 && monthHijri !== 9) {
    if (dayHijri === 12) {
      events.push(
        t(
          "Preparation for tomorrow's Ayyamul Bidh fast",
          "Persiapan puasa Ayyamul Bidh besok",
          "الاستعداد لصيام الأيام البيض غداً",
          "Nyamektakaken siyam Ayyamul Bidh benjing"
        )
      );
    } else if (dayHijri >= 13 && dayHijri <= 15) {
      events.push(
        t(
          "Happy observing the Sunnah fast of Ayyamul Bidh",
          "Selamat menunaikan puasa sunnah Ayyamul Bidh",
          "صوماً مباركاً لصيام الأيام البيض",
          "Sugeng nindakaken siyam sunah Ayyamul Bidh"
        )
      );
    }
  }

  // WEEKLY SUNNAH FAST (MON–THU, excluding Ramadan)
  if (monthHijri !== 9) {
    if (weekIndex === 1 || weekIndex === 4) {
      events.push(
        t(
          "Preparation for tomorrow's Monday–Thursday Sunnah fast",
          "Persiapan puasa sunnah Senin–Kamis besok",
          "الاستعداد لصيام الاثنين والخميس غداً",
          "Nyamektakaken siyam sunah Senen–Kemis benjing"
        )
      );
    } else if (weekIndex === 2 || weekIndex === 5) {
      events.push(
        t(
          "Happy observing the Sunnah fast (Monday–Thursday)",
          "Selamat menunaikan puasa sunnah Senin–Kamis",
          "صوماً مباركاً لصيام الاثنين والخميس",
          "Sugeng nindakaken siyam sunah Senen–Kemis"
        )
      );
    }
  }

  return [...new Set(events)];
}

export function getEventsForDate(date = new Date(), language = "en") {
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
  if (lang === "jv") return "jv";
  return "en";
}
