const { gregorianToHijri } = require("../dist/islamic-date.cjs");

const log = (title) => console.log(`\n=== ${title} ===`);

// Combined test data: [Year, Month, Day], Expected Hijri Day, Expected Hijri Name
const testCases = [
  { g: [2026, 1, 19], hDay: 30, hName: "Rajab" }, // End of Rajab 1447
  { g: [2026, 1, 20], hDay: 1, hName: "Sya'ban" }, // Start
  { g: [2026, 2, 18], hDay: 30, hName: "Sya'ban" }, // End
  { g: [2026, 2, 19], hDay: 1, hName: "Ramadhan" }, // Start
  { g: [2026, 3, 19], hDay: 29, hName: "Ramadhan" }, // End (Ramadhan 29 days)
  { g: [2026, 3, 20], hDay: 1, hName: "Syawal" }, // Start (Eid)
  { g: [2026, 4, 17], hDay: 29, hName: "Syawal" }, // End
  { g: [2026, 4, 18], hDay: 1, hName: "Dzulkaidah" }, // Start
  { g: [2026, 5, 17], hDay: 30, hName: "Dzulkaidah" }, // End
  { g: [2026, 5, 18], hDay: 1, hName: "Dzulhijjah" }, // Start
  { g: [2026, 6, 15], hDay: 29, hName: "Dzulhijjah" }, // End
  { g: [2026, 6, 16], hDay: 1, hName: "Muharram" }, // Start 1448 H
  { g: [2026, 7, 15], hDay: 30, hName: "Muharram" }, // End
  { g: [2026, 7, 16], hDay: 1, hName: "Safar" }, // Start
  { g: [2026, 8, 13], hDay: 29, hName: "Safar" }, // End
  { g: [2026, 8, 14], hDay: 1, hName: "Rabiul Awal" }, // Start
  { g: [2026, 9, 12], hDay: 30, hName: "Rabiul Awal" }, // End
  { g: [2026, 9, 13], hDay: 1, hName: "Rabiul Akhir" }, // Start
  { g: [2026, 10, 11], hDay: 29, hName: "Rabiul Akhir" }, // End
  { g: [2026, 10, 12], hDay: 1, hName: "Jumadil Awal" }, // Start
  { g: [2026, 11, 10], hDay: 30, hName: "Jumadil Awal" }, // End
  { g: [2026, 11, 11], hDay: 1, hName: "Jumadil Akhir" }, // Start
  { g: [2026, 12, 9], hDay: 29, hName: "Jumadil Akhir" }, // End
  { g: [2026, 12, 10], hDay: 1, hName: "Rajab" }, // Start
];

log("FULL 2026 TRANSITION TEST (STARTS & ENDS)");

let passed = 0;
let failed = 0;

testCases.forEach(({ g, hDay, hName }) => {
  const res = gregorianToHijri(g[0], g[1], g[2], "id", "m");

  // Normalize name check (remove 'ul' or spaces if your library uses different formatting)
  const actualName = res.monthName.replace(/[\s']+/g, "").toLowerCase();
  const expectedName = hName.replace(/[\s']+/g, "").toLowerCase();

  if (res.success && res.day === hDay && actualName.includes(expectedName)) {
    console.log(
      `✅ ${g.join("-").padEnd(10)} → ${res.day} ${res.monthName} ${res.year}`
    );
    passed++;
  } else {
    console.log(
      `❌ ${g
        .join("-")
        .padEnd(10)} FAILED! Expected ${hDay} ${hName}, but got ${res.day} ${
        res.monthName
      }`
    );
    failed++;
  }
});

log("FINAL RESULT");
console.log(`Passed: ${passed} | Failed: ${failed}`);
