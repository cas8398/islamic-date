const { gregorianToHijri } = require("../dist/islamic-date.cjs");

const log = (title) => console.log(`\n=== ${title} ===`);

// Helper for Gregorian Month Name
const getGregMonthName = (year, month, day) => {
  return new Date(year, month - 1, day).toLocaleString("en-GB", {
    month: "long",
  });
};

/**
 * 2️⃣ HIJRI CONVERSION (ARABIC)
 */
log("HIJRI CONVERSION (ACCURACY & GEORGIAN MONTH)");
const testDates = [
  // --- 1447 AH ---
  { g: [2026, 1, 1], e: "12 Rajab 1447", note: "New Year 2026" },
  { g: [2026, 1, 15], e: "26 Rajab 1447", note: "Today" },
  { g: [2026, 1, 20], e: "1 Sya'ban 1447", note: "Awal Sya'ban" },
  { g: [2026, 2, 18], e: "1 Ramadhan 1447", note: "Awal Puasa" },
  { g: [2026, 3, 20], e: "1 Syawal 1447", note: "Hari Raya Idul Fitri" },
  { g: [2026, 4, 18], e: "1 Dzulkaidah 1447", note: "Awal Dzulqa'dah" },
  { g: [2026, 5, 18], e: "1 Dzulhijjah 1447", note: "Awal Dzulhijjah" },
  { g: [2026, 5, 27], e: "10 Dzulhijjah 1447", note: "Idul Adha" },

  // --- 1448 AH (Tahun Baru Hijriah) ---
  { g: [2026, 6, 16], e: "1 Muharram 1448", note: "Tahun Baru Islam 1448" },
  { g: [2026, 7, 16], e: "1 Safar 1448", note: "Awal Safar" },
  { g: [2026, 8, 14], e: "1 Rabiul Awal 1448", note: "Awal Rabiul Awal" },
  { g: [2026, 9, 13], e: "1 Rabiul Akhir 1448", note: "Awal Rabiul Akhir" },
  { g: [2026, 10, 12], e: "1 Jumadil Awal 1448", note: "Awal Jumadil Awal" },
  { g: [2026, 11, 11], e: "1 Jumadil Akhir 1448", note: "Awal Jumadil Akhir" },
  { g: [2026, 12, 10], e: "1 Rajab 1448", note: "Awal Rajab 1448" },
];

testDates.forEach(({ g, e, note }) => {
  const gMonth = getGregMonthName(g[0], g[1], g[2]);
  const res = gregorianToHijri(g[0], g[1], g[2], (language = "id"));

  // Format result to match the 'Expected' string style for comparison
  const formattedResult = `${res.day} ${res.monthName} ${res.year}`;
  const displayResult = `${formattedResult}`;

  // Check if result matches expected
  const isMatch = formattedResult === e;
  const status = isMatch ? "✅" : "❌";

  console.log(
    `${status} [${g[2].toString().padStart(2)} ${gMonth.padEnd(9)} ${
      g[0]
    }] -> ${displayResult.padEnd(25)} | Expected: ${e}`
  );
});
