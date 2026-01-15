// examples/node-basic.js
const {
  getHijriDateWithEvents,
  gregorianToHijri,
  getCurrentHijriDate,
  getIslamicEvents,
  getJawaDate,
} = require("islamic-date");

console.log("📅 islamic-date - Node.js Basic Examples\n");

// Example 1: Current date with events
console.log("1. 📍 Current Date with Events:");
const today = getHijriDateWithEvents({
  language: "ar",
  dayChangeAtMidnight: false,
});
console.log(`   ${today.day} ${today.monthName} ${today.year} هـ`);
if (today.events && today.events.length > 0) {
  console.log(`   الأحداث: ${today.events.join(" - ")}`);
}
console.log();

// Example 2: Convert specific date
console.log("2. 🔄 Convert Specific Date:");
const hijri = gregorianToHijri(2024, 3, 15, "id");
console.log(
  `   15 Maret 2024 → ${hijri.day} ${hijri.monthName} ${hijri.year} H`
);
console.log();

// Example 3: Current date in different languages
console.log("3. 🌍 Multiple Languages:");
const languages = ["en", "ar", "id"];
languages.forEach((lang) => {
  const date = getCurrentHijriDate({ language: lang });
  console.log(`   ${lang}: ${date.day} ${date.monthName} ${date.year}`);
});
console.log();

// Example 4: Islamic events for specific date
console.log("4. 🕌 Islamic Events:");
const ramadanEvents = getIslamicEvents(9, 1, 3, "en");
console.log(
  `   Ramadan 1: ${ramadanEvents.length > 0 ? ramadanEvents[0] : "No events"}`
);

const eidEvents = getIslamicEvents(10, 1, 5, "ar");
console.log(
  `   Eid al-Fitr: ${eidEvents.length > 0 ? eidEvents[0] : "No events"}`
);
console.log();

// Example 5: Jawa calendar
console.log("5. 🎋 Jawa/Pasaran Calendar:");
getJawaDate(new Date(), "id").then((jawa) => {
  console.log(
    `   ${jawa.dayName}, ${jawa.day} ${jawa.monthName} ${jawa.year} J`
  );
  console.log(`   Neptu: ${jawa.neptu.total} (${jawa.neptu.meaning})`);
});
