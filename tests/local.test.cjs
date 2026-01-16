const {
  getJawaDate,
  getJawaDayFromGregorian,
  JAWA_DAYS,
  getEventsForDate,
  getAllCalendars,
} = require("../dist/islamic-date.cjs");

describe("Jawa Calendar Tests", () => {
  test("Basic Jawa date formatting", () => {
    const jawaDate = getJawaDate(new Date(), "id");

    expect(jawaDate).toHaveProperty("dayName");
    expect(jawaDate).toHaveProperty("monthName");
    expect(jawaDate).toHaveProperty("day");
    expect(jawaDate).toHaveProperty("year");

    console.log(
      `✓ Basic Jawa Date: ${jawaDate.dayName}, ${jawaDate.day} ${jawaDate.monthName} ${jawaDate.year} J`
    );
  });

  test("Jawa day calculation", () => {
    const today = new Date();
    const jawaDayIndex = getJawaDayFromGregorian(today);

    expect(jawaDayIndex).toBeGreaterThanOrEqual(0);
    expect(jawaDayIndex).toBeLessThan(5);
    expect(JAWA_DAYS.id[jawaDayIndex]).toBeDefined();

    console.log(
      `✓ Jawa Day: ${JAWA_DAYS.id[jawaDayIndex]} (index: ${jawaDayIndex})`
    );
  });

  test("Specific dates conversion", () => {
    const testDates = [
      { date: new Date(2026, 0, 1), expected: "Pon" },
      { date: new Date(2026, 0, 2), expected: "Wage" },
      { date: new Date(2026, 0, 3), expected: "Kliwon" },
    ];

    testDates.forEach(({ date, expected }) => {
      const jawa = getJawaDate(date, "id");
      expect(jawa.dayName).toBe(expected);

      console.log(`✓ ${date.toLocaleDateString()}: ${jawa.dayName} ✅`);
    });
  });

  test("All calendars combined", () => {
    const allCalendars = getAllCalendars({
      language: "id",
      includeEvents: true,
      includeJawa: true,
    });

    expect(allCalendars).toHaveProperty("gregorian");
    expect(allCalendars).toHaveProperty("hijriFormatted");
    expect(allCalendars).toHaveProperty("jawaFormatted");

    console.log(`✓ Gregorian: ${allCalendars.gregorian}`);
    console.log(`✓ Hijri: ${allCalendars.hijriFormatted}`);
    console.log(`✓ Jawa: ${allCalendars.jawaFormatted}`);

    if (allCalendars.events && allCalendars.events.length > 0) {
      console.log(`✓ Events found: ${allCalendars.events.length}`);
    }
  });

  test("Different language support", () => {
    const languages = ["id", "jv", "en"];
    const results = {};

    languages.forEach((lang) => {
      const jawa = getJawaDate(new Date(), lang);
      expect(jawa.dayName).toBeDefined();
      expect(jawa.monthName).toBeDefined();

      results[lang] = `${jawa.dayName}, ${jawa.monthName}`;
    });

    console.log("✓ Language support:");
    Object.entries(results).forEach(([lang, result]) => {
      console.log(`  ${lang}: ${result}`);
    });
  });

  test("Events function executes", () => {
    expect(() => {
      getEventsForDate(new Date("2026-01-01"), "jv");
    }).not.toThrow();

    console.log("✓ getEventsForDate() executes without throwing error");
  });
});

// Optional: Run a summary after all tests
afterAll(() => {
  console.log("\n" + "=".repeat(50));
  console.log("🎉 All Jawa Calendar tests completed!");
  console.log("=".repeat(50));
});
