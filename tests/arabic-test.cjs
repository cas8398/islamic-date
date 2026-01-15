const { gregorianToHijri } = require("../dist/islamic-date.cjs");

const log = (title) => console.log(`\n=== ${title} ===`);

log("COMPREHENSIVE NEW YEAR TEST (2010-2030)");

let passed = 0;
let failed = 0;
const failedDetails = [];
const yearErrors = [];

// Test every Gregorian New Year from 2010 to 2040
for (let year = 2010; year <= 2030; year++) {
  const testDate = [year, 1, 1]; // Jan 1 of each year

  const res = gregorianToHijri(
    testDate[0],
    testDate[1],
    testDate[2],
    "id",
    "m" // MABIMS calendar
  );

  if (!res.success) {
    const errorMsg = `${year}-01-01: Error - ${res.error}`;
    console.log(`❌ ${errorMsg}`);
    failed++;
    failedDetails.push(errorMsg);
    yearErrors.push(year);
    continue;
  }

  const formatted = `${res.day} ${res.monthName} ${res.year}`;
  console.log(`✅ ${year.toString().padStart(4)}-01-01 → ${formatted}`);
  passed++;
}

// Also test critical dates (start of each Gregorian month for a few years)
log("CRITICAL DATE SAMPLING");

const sampleYears = [2010, 2015, 2020, 2025, 2030, 2035];
const criticalDates = [];

sampleYears.forEach((year) => {
  // Test start of each month
  for (let month = 1; month <= 12; month++) {
    criticalDates.push([year, month, 1]);
  }
});

criticalDates.forEach(([year, month, day]) => {
  const res = gregorianToHijri(year, month, day, "id", "m");

  if (!res.success) {
    console.log(`❌ ${year}-${month.toString().padStart(2)}-${day}: Error`);
    failed++;
  } else {
    passed++;
  }
});

// Summary
console.log(`\n📊 COMPREHENSIVE TEST SUMMARY (1990-2050):`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(
  `📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`
);

if (yearErrors.length > 0) {
  console.log(`\n🔴 YEARS WITH ERRORS (New Year Test):`);

  // Group consecutive error years
  let startYear = yearErrors[0];
  let prevYear = yearErrors[0];
  const errorRanges = [];

  for (let i = 1; i < yearErrors.length; i++) {
    if (yearErrors[i] === prevYear + 1) {
      prevYear = yearErrors[i];
    } else {
      if (startYear === prevYear) {
        errorRanges.push(`${startYear}`);
      } else {
        errorRanges.push(`${startYear}-${prevYear}`);
      }
      startYear = yearErrors[i];
      prevYear = yearErrors[i];
    }
  }

  // Add last range
  if (startYear === prevYear) {
    errorRanges.push(`${startYear}`);
  } else {
    errorRanges.push(`${startYear}-${prevYear}`);
  }

  console.log(`   Missing data for years: ${errorRanges.join(", ")}`);
}

if (failedDetails.length > 0) {
  console.log(`\n🔴 FAILED DETAILS (First 10):`);
  failedDetails.slice(0, 10).forEach((detail) => console.log(`  ${detail}`));
  if (failedDetails.length > 10) {
    console.log(`  ... and ${failedDetails.length - 10} more errors`);
  }
}
