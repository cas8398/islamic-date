/**
 * Javanese Calendar Logic
 * Based on the Sultan Agungan (Asapon) System
 */

// 1. Configuration & Constants
const WINDU_CYCLE = [
  { name: "Alip", days: 354 }, // Year 1
  { name: "Ehe", days: 355 }, // Year 2
  { name: "Jimawal", days: 354 }, // Year 3
  { name: "Je", days: 354 }, // Year 4
  { name: "Dal", days: 355 }, // Year 5
  { name: "Be", days: 354 }, // Year 6
  { name: "Wawu", days: 354 }, // Year 7
  { name: "Jimakir", days: 355 }, // Year 8
];

const ANCHOR_DATE = new Date(Date.UTC(2024, 6, 7)); // 1 Suro 1958 AJ
const ANCHOR_JAWA_YEAR = 1958;
const ANCHOR_WINDU_INDEX = 6;

export const JAWA_DAYS = {
  id: ["Legi", "Pahing", "Pon", "Wage", "Kliwon"],
  jv: ["Legi", "Paing", "Pon", "Wage", "Kliwon"],
  en: ["Legi", "Pahing", "Pon", "Wage", "Kliwon"],
};

export const JAWA_MONTHS = {
  id: {
    1: "Sura",
    2: "Sapar",
    3: "Mulud",
    4: "Bakda Mulud",
    5: "Jumadil Awal",
    6: "Jumadil Akhir",
    7: "Rejeb",
    8: "Ruwah",
    9: "Pasa",
    10: "Sawal",
    11: "Sela",
    12: "Besar",
  },
  jv: {
    1: "Suro",
    2: "Sapar",
    3: "Mulud",
    4: "Bakda Mulud",
    5: "Jumadil Awal",
    6: "Jumadil Akir",
    7: "Rejeb",
    8: "Ruwah",
    9: "Poso",
    10: "Sawal",
    11: "Sela",
    12: "Besar",
  },
  en: {
    1: "Sura",
    2: "Sapar",
    3: "Mulud",
    4: "Bakda Mulud",
    5: "Jumadil Awal",
    6: "Jumadil Akhir",
    7: "Rejeb",
    8: "Ruwah",
    9: "Pasa",
    10: "Sawal",
    11: "Sela",
    12: "Besar",
  },
};

// 2. Specialized Utilities

/**
 * standalone utility to get Pasaran index (0-4)
 */
export function getJawaDayFromGregorian(date = new Date()) {
  // Use UTC to prevent timezone/DST hours from breaking the Math.floor
  const target = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  // ANCHOR: Jan 14, 2026 is Rabu Legi
  const anchorDate = Date.UTC(2026, 0, 14);
  const anchorIdx = 0; // 0 = Legi

  const msPerDay = 86400000;
  // Math.round ensures 23.99 or 24.01 hours both count as 1 day
  const diffDays = Math.round((target - anchorDate) / msPerDay);

  let index = (anchorIdx + diffDays) % 5;
  return index < 0 ? index + 5 : index;
}

function getNeptuMeaning(total) {
  const meanings = {
    7: "Lungguh",
    8: "Laku",
    9: "Mantra",
    10: "Pendito",
    11: "Aras",
    12: "Padu",
    13: "Lintang",
    14: "Rembulan",
    15: "Srengenge",
    16: "Banyu",
    17: "Bumi",
    18: "Gede",
  };
  return meanings[total] || "Various";
}

export function calculateNeptu(jawaDayIndex, date) {
  const pasaranValues = [5, 9, 7, 4, 8];
  const weekdayValues = [5, 4, 3, 7, 8, 6, 9];

  const pVal = pasaranValues[jawaDayIndex];
  const wVal = weekdayValues[date.getDay()];
  const total = pVal + wVal;

  return { total, meaning: getNeptuMeaning(total) };
}

// 3. Main Engine

/**
 * Get full Javanese date details
 */
export function getJawaDate(date = new Date(), language = "jv") {
  const targetDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const msPerDay = 86400000;

  let diffDays = Math.floor((targetDate - ANCHOR_DATE) / msPerDay);
  let currentYear = ANCHOR_JAWA_YEAR;
  let winduIdx = ANCHOR_WINDU_INDEX;

  if (diffDays >= 0) {
    while (diffDays >= WINDU_CYCLE[winduIdx].days) {
      diffDays -= WINDU_CYCLE[winduIdx].days;
      currentYear++;
      winduIdx = (winduIdx + 1) % 8;
    }
  } else {
    while (diffDays < 0) {
      winduIdx = (winduIdx - 1 + 8) % 8;
      currentYear--;
      diffDays += WINDU_CYCLE[winduIdx].days;
    }
  }

  const isLeap = WINDU_CYCLE[winduIdx].days === 355;
  const monthLengths = [
    30,
    29,
    30,
    29,
    30,
    29,
    30,
    29,
    30,
    29,
    30,
    isLeap ? 30 : 29,
  ];

  let month = 0;
  let daysRemaining = diffDays;
  for (let i = 0; i < 12; i++) {
    if (daysRemaining < monthLengths[i]) {
      month = i + 1;
      break;
    }
    daysRemaining -= monthLengths[i];
  }

  const dayIndex = getJawaDayFromGregorian(date);

  return {
    day: daysRemaining + 1,
    dayName: JAWA_DAYS[language]?.[dayIndex] || JAWA_DAYS.id[dayIndex],
    dayIndex: dayIndex,
    month: month,
    monthName: JAWA_MONTHS[language][month],
    year: currentYear,
    winduYearName: WINDU_CYCLE[winduIdx].name,
    pasaran: JAWA_DAYS.id[dayIndex],
    neptu: calculateNeptu(dayIndex, date),
    isNewYear: month === 1 && daysRemaining + 1 === 1,
  };
}

// 4. Global Export
export default {
  getJawaDate,
  getJawaDayFromGregorian,
  calculateNeptu,
  JAWA_DAYS,
  JAWA_MONTHS,
};
