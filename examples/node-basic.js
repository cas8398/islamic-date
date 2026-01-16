const {
  getHijriDateWithEvents,
  gregorianToHijri,
  getCurrentHijriDate,
  getIslamicEvents,
  getJawaDate,
} = require("islamic-date");

console.log("📅 islamic-date - Node.js Basic Examples\n");

// Example 1: Current date using MABIMS criteria (Standard for SE Asia)
console.log("1. 📍 Current Date (MABIMS):");
const today = getCurrentHijriDate({
  language: "id",
  method: "m", // Use 'm' for MABIMS/Kemenag alignment
});
console.log(`   Hari ini: ${today.day} ${today.monthName} ${today.year} H`);
console.log();

// Example 2: The 2026 Ramadan Transition (Your recent fix!)
console.log("2. 🔄 Specific Conversion (Ramadhan 2026):");
// February 19, 2026 is 1 Ramadhan per your MABIMS_DAT fix
const ramadan2026 = gregorianToHijri(2026, 2, 19, "id", "m");
console.log(
  `   19 Feb 2026 → ${ramadan2026.day} ${ramadan2026.monthName} ${ramadan2026.year} H`
);
console.log();

// Example 3: Multiple Languages and Formats
console.log("3. 🌍 Multiple Languages:");
["en", "ar", "id"].forEach((lang) => {
  const date = getCurrentHijriDate({ language: lang });
  console.log(
    `   [${lang.toUpperCase()}]: ${date.day} ${date.monthName} ${date.year}`
  );
});
console.log();

// Example 4: Islamic Events with Descriptions
console.log("4. 🕌 Islamic Events:");
const syawalEvents = getIslamicEvents(10, 1, 5, "id");
if (syawalEvents.length > 0) {
  console.log(`   1 Syawal: ${syawalEvents[0]}`); // Output: Hari Raya Idul Fitri
}
console.log();

// Example 5: Jawa Calendar (Promised result)
console.log("5. 🎋 Jawa/Pasaran Calendar:");
getJawaDate(new Date(), "id")
  .then((jawa) => {
    console.log(
      `   ${jawa.dayName} ${jawa.pasaran}, ${jawa.day} ${jawa.monthName} ${jawa.year} J`
    );
    console.log(`   Neptu: ${jawa.neptu.total} (${jawa.neptu.meaning})`);
  })
  .catch((err) => console.error("   Jawa Calendar Error:", err));
