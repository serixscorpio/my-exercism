export function GradeSchool() {
  const db = {};
  return {
    add(name, gradeNum) {
      db[gradeNum] = db[gradeNum] || [];
      db[gradeNum].push(name);
      db[gradeNum].sort();
    },
    grade(gradeNum) {
      if (!db[gradeNum]) return [];
      return [...db[gradeNum]];
    },
    roster() {
      return JSON.parse(JSON.stringify(db));
    },
  };
}
