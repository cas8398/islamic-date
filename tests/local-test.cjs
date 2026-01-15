const {
  getJawaDate,
  getJawaDayFromGregorian,
  JAWA_DAYS,
  JAWA_MONTHS,
  getAllCalendars,
} = require("../dist/islamic-date.cjs");

console.log("🧪 Testing Jawa Calendar\n");

// Test 1: Basic Jawa date
console.log("🔍 Test 1: Basic Jawa Date");
const jawaDate = getJawaDate(new Date(), "id");
console.log("Jawa Date:", jawaDate);
console.log(
  `Formatted: ${jawaDate.dayName}, ${jawaDate.day} ${jawaDate.monthName} ${jawaDate.year} J`
);
console.log("Day name:", jawaDate.dayName);
console.log("Month name:", jawaDate.monthName);
console.log();

// Test 2: Jawa day calculation
console.log("🔍 Test 2: Jawa Day Calculation");
const today = new Date();
const jawaDayIndex = getJawaDayFromGregorian(today);
console.log("Today's Jawa day index:", jawaDayIndex);
console.log("Jawa day name:", JAWA_DAYS.id[jawaDayIndex]);
console.log("All Jawa days:", JAWA_DAYS.id.join(", "));
console.log();

// Test 3: Test specific dates
console.log("🔍 Test 3: Specific Dates");
const testDates = [
  new Date(2024, 0, 1), // Jan 1, 2024 (should be Legi)
  new Date(2024, 0, 2), // Jan 2, 2024 (should be Pahing)
  new Date(2024, 0, 3), // Jan 3, 2024 (should be Pon)
];

testDates.forEach((date, i) => {
  const jawa = getJawaDate(date, "id");
  console.log(`${date.toLocaleDateString()}: ${jawa.dayName}`);
});
console.log();

// Test 4: Combined calendars
console.log("🔍 Test 4: All Calendars Combined");
const allCalendars = getAllCalendars({
  language: "id",
  includeEvents: true,
  includeJawa: true,
});
console.log("Gregorian:", allCalendars.gregorian);
console.log("Hijri:", allCalendars.hijriFormatted);
console.log("Jawa:", allCalendars.jawaFormatted);
if (allCalendars.events && allCalendars.events.length > 0) {
  console.log("Events:", allCalendars.events);
}
console.log();

// Test 5: Different languages
console.log("🔍 Test 5: Jawa in Different Languages");
const langs = ["id", "jv", "en"];
langs.forEach((lang) => {
  const jawa = getJawaDate(new Date(), lang);
  console.log(`${lang}: ${jawa.dayName}, ${jawa.monthName}`);
});
