export function GradeSchool() {
  const db = {};
  const grade = gradeNum => (db[gradeNum] ? db[gradeNum].slice() : []);
  const add = (name, gradeNum) => {
    db[gradeNum] = db[gradeNum] || [];
    db[gradeNum].push(name);
    db[gradeNum].sort();
  };
  const roster = () => Object.keys(db).reduce((accumulator, key) => {
    accumulator[key] = grade(key);
    return accumulator;
  }, {});

  return Object.freeze({
    add,
    grade,
    roster,
  });
}
