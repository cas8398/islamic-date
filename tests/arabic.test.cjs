// tests/arabic.test.cjs
const { gregorianToHijri } = require("../dist/islamic-date.cjs");

describe("MABIMS Calendar Tests (2010-2030)", () => {
  test("New Year conversions 2010-2030", () => {
    let passed = 0;
    let failed = 0;

    for (let year = 2010; year <= 2030; year++) {
      const res = gregorianToHijri(year, 1, 1, "id", "m");

      if (res.success) {
        passed++;
        console.log(
          `✅ ${year.toString().padStart(4)}-01-01 → ${res.day} ${
            res.monthName
          } ${res.year}`
        );
      } else {
        failed++;
        console.log(`❌ ${year}-01-01: Error - ${res.error}`);
      }
    }

    expect(failed).toBe(0); // All should pass
    console.log(`\n📊 Passed: ${passed}, Failed: ${failed}`);
  });

  test("Critical date sampling", () => {
    const sampleYears = [2010, 2015, 2020, 2025, 2030];
    let errors = [];

    sampleYears.forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        const res = gregorianToHijri(year, month, 1, "id", "m");
        if (!res.success) {
          errors.push(`${year}-${month}-01: ${res.error}`);
        }
      }
    });

    expect(errors.length).toBe(0);
  });
});
