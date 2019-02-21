export function GradeSchool() {
  const db = {};
  const grade = gradeNum => (db[gradeNum] ? db[gradeNum].slice() : []);
  const add = (name, gradeNum) => {
    db[gradeNum] = db[gradeNum] || [];
    db[gradeNum].push(name);
    db[gradeNum].sort();
  };
  const roster = () => Object.keys(db).reduce((acc, key) => ({ ...acc, [key]: grade(key) }), {});

  return Object.freeze({
    add,
    grade,
    roster,
  });
}
