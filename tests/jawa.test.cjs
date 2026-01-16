// tests/jawa.test.js
const { getJawaDate, getAllCalendars } = require("../dist/islamic-date.cjs");

describe("Javanese Calendar Tests", () => {
  describe("1. Multi-Year New Year (1 Suro) Validation", () => {
    const futureTransitions = [
      // --- PAST 10 YEARS ---
      { date: new Date(2016, 9, 2), expectedYear: 1950, label: "2016 1 Suro" },
      { date: new Date(2017, 8, 21), expectedYear: 1951, label: "2017 1 Suro" },
      { date: new Date(2018, 8, 11), expectedYear: 1952, label: "2018 1 Suro" },
      { date: new Date(2019, 7, 31), expectedYear: 1953, label: "2019 1 Suro" },
      { date: new Date(2020, 7, 20), expectedYear: 1954, label: "2020 1 Suro" },
      { date: new Date(2021, 7, 10), expectedYear: 1955, label: "2021 1 Suro" },
      { date: new Date(2022, 6, 30), expectedYear: 1956, label: "2022 1 Suro" },
      { date: new Date(2023, 6, 19), expectedYear: 1957, label: "2023 1 Suro" },
      { date: new Date(2024, 6, 7), expectedYear: 1958, label: "2024 1 Suro" },
      { date: new Date(2025, 5, 27), expectedYear: 1959, label: "2025 1 Suro" },

      // --- CURRENT & FUTURE 10 YEARS ---
      { date: new Date(2026, 5, 16), expectedYear: 1960, label: "2026 1 Suro" },
      { date: new Date(2027, 5, 6), expectedYear: 1961, label: "2027 1 Suro" },
      { date: new Date(2028, 4, 25), expectedYear: 1962, label: "2028 1 Suro" },
      { date: new Date(2029, 4, 15), expectedYear: 1963, label: "2029 1 Suro" },
      { date: new Date(2030, 4, 4), expectedYear: 1964, label: "2030 1 Suro" },
      { date: new Date(2031, 3, 24), expectedYear: 1965, label: "2031 1 Suro" },
      { date: new Date(2032, 3, 12), expectedYear: 1966, label: "2032 1 Suro" },
      { date: new Date(2033, 2, 31), expectedYear: 1967, label: "2033 1 Suro" },
      { date: new Date(2034, 2, 21), expectedYear: 1968, label: "2034 1 Suro" },
      { date: new Date(2035, 2, 11), expectedYear: 1969, label: "2035 1 Suro" },
      { date: new Date(2036, 1, 29), expectedYear: 1970, label: "2036 1 Suro" },
    ];

    test("all 1 Suro dates should have correct AJ years", () => {
      const failures = [];

      futureTransitions.forEach((t) => {
        const res = getJawaDate(t.date, "id");
        if (res.year !== t.expectedYear) {
          failures.push({
            label: t.label,
            expected: t.expectedYear,
            actual: res.year,
            date: t.date.toLocaleDateString("en-GB"),
          });
        }
      });

      if (failures.length > 0) {
        console.log("\n❌ 1 Suro Test Failures:");
        failures.forEach((f) => {
          console.log(
            `   ${f.label}: ${f.date} -> Expected ${f.expected} AJ, Got ${f.actual} AJ`
          );
        });
      }

      expect(failures.length).toBe(0);
    });
  });

  describe("2. Localization Check (Indonesian vs Javanese)", () => {
    test('Indonesian should use "Sura", Javanese should use "Suro"', () => {
      const testSuroDate = new Date(2026, 5, 16); // 1 Suro 1960
      const idMonth = getJawaDate(testSuroDate, "id").monthName;
      const jvMonth = getJawaDate(testSuroDate, "jv").monthName;

      console.log(`   Indonesian : ${idMonth}`);
      console.log(`   Javanese   : ${jvMonth}`);

      // Should be different (Sura vs Suro)
      expect(idMonth).not.toBe(jvMonth);
      expect(idMonth.toLowerCase()).toContain("sura");
      expect(jvMonth.toLowerCase()).toContain("suro");
    });
  });

  describe("3. Weton & Neptu (Numerology)", () => {
    test("Rabu Legi should have correct neptu total", () => {
      const wetonTest = getJawaDate(new Date(2026, 0, 14), "id"); // Rabu Legi

      console.log(`   Date   : Rabu Legi, 14 Jan 2026`);
      console.log(`   Pasaran: ${wetonTest.pasaran}`);
      console.log(`   Total  : ${wetonTest.neptu.total}`);
      console.log(`   Meaning: ${wetonTest.neptu.meaning}`);

      expect(wetonTest.pasaran).toBe("Legi");
      expect(wetonTest.neptu.total).toBe(12); // Rabu (7) + Legi (5) = 12
      expect(wetonTest.neptu.meaning).toBeDefined();
    });
  });

  describe("4. Year Transition (1959 AJ -> 1960 AJ)", () => {
    const transitionDates = [
      { d: new Date(2026, 5, 15), expected: 1959, name: "End of 1959" },
      { d: new Date(2026, 5, 16), expected: 1960, name: "1 Suro (New Year)" },
    ];

    test("year transition should be correct", () => {
      transitionDates.forEach((t) => {
        const res = getJawaDate(t.d, "id");
        expect(res.year).toBe(t.expected);
      });
    });
  });

  describe("5. 5-Day Pasaran Cycle Validation", () => {
    const boundaryTests = [
      // Test 1: Consecutive days (Standard)
      { date: new Date(2026, 0, 14), expected: "Legi" },
      { date: new Date(2026, 0, 15), expected: "Pahing" },

      // Test 2: Month Boundary (Jan 31 is Pon)
      { date: new Date(2026, 0, 31), expected: "Pon" },
      { date: new Date(2026, 1, 1), expected: "Wage" },

      // Test 3: Leap Year Boundary 2028 (Feb 29 is Pahing)
      { date: new Date(2028, 1, 28), expected: "Legi" },
      { date: new Date(2028, 1, 29), expected: "Pahing" },
      { date: new Date(2028, 2, 1), expected: "Pon" },
    ];

    test("all pasaran boundaries should be correct", () => {
      const failures = [];

      boundaryTests.forEach((t) => {
        const res = getJawaDate(t.date, "id");
        if (res.pasaran !== t.expected) {
          failures.push({
            date: t.date.toDateString(),
            expected: t.expected,
            actual: res.pasaran,
          });
        }
      });

      if (failures.length > 0) {
        console.log("\n❌ Pasaran Test Failures:");
        failures.forEach((f) => {
          console.log(`   ${f.date}: Expected ${f.expected}, Got ${f.actual}`);
        });
      }

      expect(failures.length).toBe(0);
    });
  });

  describe("6. Combined Calendar Output", () => {
    test("getAllCalendars should return formatted strings", () => {
      const full = getAllCalendars({
        language: "jv",
        includeJawa: true,
      });

      console.log("\n   " + "═".repeat(40));
      console.log(`   📅 Masehi : ${full.gregorian}`);
      console.log(`   🌙 Hijri  : ${full.hijriFormatted}`);
      console.log(`   🎋 Jawa   : ${full.jawaFormatted}`);
      console.log("   " + "═".repeat(40));

      expect(full.gregorian).toBeDefined();
      expect(full.hijriFormatted).toBeDefined();
      expect(full.jawaFormatted).toBeDefined();
      expect(full.jawaFormatted).toContain("AJ"); // Should contain AJ (Anno Javanico)
    });
  });
});
