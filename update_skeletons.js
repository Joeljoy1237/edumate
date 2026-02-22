const fs = require("fs");

const skeletons = {
  "src/app/student/my-profile/page.tsx": `  if (loading) {
     return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6 animate-pulse">
          <div className="w-full">
            <div className="h-10 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                      <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  </div>
               </div>
               <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 h-[400px]"></div>
               </div>
            </div>
          </div>
        </div>
     );
  }`,
  "src/app/student/performance/page.tsx": `  if (loading) {
      return (
        <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="h-32 bg-white rounded-lg border border-gray-100"></div>
                <div className="h-32 bg-white rounded-lg border border-gray-100"></div>
                <div className="h-32 bg-white rounded-lg border border-gray-100"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="h-80 bg-white rounded-lg border border-gray-100"></div>
                <div className="h-80 bg-white rounded-lg border border-gray-100"></div>
            </div>
        </div>
      );
  }`,
  "src/app/student/attendance/page.tsx": `  if (loading) {
      return (
          <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="h-64 bg-white rounded-lg border border-gray-100 mb-6"></div>
              <div className="h-64 bg-white rounded-lg border border-gray-100"></div>
          </div>
      );
  }`,
  "src/app/student/my-fees/page.tsx": `  if (loading) {
      return (
          <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="h-32 bg-white rounded-xl border border-gray-100"></div>
                  <div className="h-32 bg-white rounded-xl border border-gray-100"></div>
                  <div className="h-32 bg-white rounded-xl border border-gray-100"></div>
              </div>
              <div className="h-64 bg-white rounded-xl border border-gray-100"></div>
          </div>
      );
  }`,
  "src/app/student/assignments/page.tsx": `  if (loading) {
      return (
          <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 w-full bg-white border border-gray-100 rounded-lg mb-6"></div>
              <div className="space-y-4">
                  <div className="h-24 bg-white rounded-lg border border-gray-100"></div>
                  <div className="h-24 bg-white rounded-lg border border-gray-100"></div>
                  <div className="h-24 bg-white rounded-lg border border-gray-100"></div>
              </div>
          </div>
      );
  }`,
  "src/app/student/university-results/page.tsx": `  if (loading) {
      return (
          <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-64 bg-white border border-gray-100 rounded-lg mb-6"></div>
              <div className="h-64 bg-white rounded-lg border border-gray-100"></div>
          </div>
      );
  }`,
  "src/app/student/hostel-and-trans/page.tsx": `  if (loading) {
      return (
          <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="h-64 bg-white rounded-lg border border-gray-100 w-full"></div>
          </div>
      );
  }`,
  "src/app/student/settings/page.tsx": `  if (loading) {
      return (
          <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                 <div className="h-64 bg-white rounded-xl border border-gray-100 col-span-1"></div>
                 <div className="h-96 bg-white rounded-xl border border-gray-100 col-span-3"></div>
              </div>
          </div>
      );
  }`,
};

for (const [file, skeletonCode] of Object.entries(skeletons)) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");

    // We can find where 'if (loading) {' starts, and where the associated return block ends.
    const startIdx = content.indexOf("if (loading) {");
    if (startIdx !== -1) {
      let braceCount = 0;
      let endIdx = -1;
      let started = false;

      // Track braces to safely replace the entire block
      for (let i = startIdx; i < content.length; i++) {
        if (content[i] === "{") {
          braceCount++;
          started = true;
        } else if (content[i] === "}") {
          braceCount--;
        }

        if (started && braceCount === 0) {
          endIdx = i;
          break;
        }
      }

      if (endIdx !== -1) {
        const newContent =
          content.substring(0, startIdx) +
          skeletonCode +
          content.substring(endIdx + 1);
        fs.writeFileSync(file, newContent, "utf8");
        console.log("Replaced skeleton in " + file);
      } else {
        console.log("Could not find end of loading block in " + file);
      }
    } else {
      console.log("loading block missing in " + file);
    }
  }
}
