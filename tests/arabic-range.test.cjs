// tests/arabic-range.test.js
const { gregorianToHijri } = require("../dist/islamic-date.cjs");

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

describe("2026 Hijri Month Transitions (MABIMS Calendar)", () => {
  test("all month transitions should be correct", () => {
    let passed = 0;
    let failed = 0;
    const failures = [];

    testCases.forEach(({ g, hDay, hName }, index) => {
      const [year, month, day] = g;
      const res = gregorianToHijri(year, month, day, "id", "m");

      // Normalize name check
      const actualName = res.monthName
        ? res.monthName.replace(/[\s']+/g, "").toLowerCase()
        : "";
      const expectedName = hName.replace(/[\s']+/g, "").toLowerCase();

      const isSuccess =
        res.success && res.day === hDay && actualName.includes(expectedName);

      if (isSuccess) {
        passed++;
      } else {
        failed++;
        failures.push({
          date: `${year}-${month.toString().padStart(2)}-${day
            .toString()
            .padStart(2)}`,
          expected: `${hDay} ${hName}`,
          actual: res.success
            ? `${res.day} ${res.monthName}`
            : `Error: ${res.error}`,
        });
      }
    });

    // Log detailed results
    console.log(`\n📊 2026 Month Transition Test Results:`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);

    if (failures.length > 0) {
      console.log(`\n🔴 Failures:`);
      failures.forEach((f) => {
        console.log(`   ${f.date}: Expected ${f.expected}, Got ${f.actual}`);
      });
    }

    // Assert all passed
    expect(failed).toBe(0);
  });
});
