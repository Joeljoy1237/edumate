const fs = require("fs");

const files = [
  "src/app/student/dashboard/page.tsx",
  "src/app/student/my-profile/page.tsx",
  "src/app/student/my-fees/page.tsx",
  "src/app/student/attendance/page.tsx",
  "src/app/student/assignments/page.tsx",
  "src/app/student/performance/page.tsx",
  "src/app/student/university-results/page.tsx",
  "src/app/student/hostel-and-trans/page.tsx",
  "src/app/student/settings/page.tsx",
];

files.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // Remove max-width and mx-auto
    content = content.replace(/max-w-[0-9a-zA-Z]+/g, "w-full");
    content = content.replace(/\bmx-auto\b/g, "");

    // Remove shadows
    content = content.replace(/\s*shadow-sm\b/g, "");
    content = content.replace(/\s*shadow-md\b/g, "");
    content = content.replace(/\s*shadow-lg\b/g, "");
    content = content.replace(/\s*shadow-xl\b/g, "");
    content = content.replace(/\s*shadow-2xl\b/g, "");
    content = content.replace(/\s*shadow\b/g, "");
    content = content.replace(/\s*drop-shadow-sm\b/g, "");
    content = content.replace(/\s*drop-shadow-md\b/g, "");
    content = content.replace(/\s*drop-shadow-lg\b/g, "");
    content = content.replace(/\s*drop-shadow-xl\b/g, "");
    content = content.replace(/\bshadow-[a-z]+-[0-9]+\/[0-9]+\b/g, "");

    // borders
    content = content.replace(/\bborder-gray-200\b/g, "border-gray-100");

    fs.writeFileSync(file, content, "utf8");
    console.log("Fixed wrapper classes in " + file);
  } else {
    console.log("File not found: " + file);
  }
});
