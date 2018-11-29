export default (year, month, dayOfWeek, descriptor) => {
  const daysOfWeek = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const dayRanges = {
    teenth: { first: 13, last: 19 },
    '1st': { first: 1, last: 7 },
    '2nd': { first: 8, last: 14 },
    '3rd': { first: 15, last: 21 },
    '4th': { first: 22, last: 28 },
    '5th': { first: 29, last: 31 },
    last: { first: -6, last: 0, monthOffset: 1 },
  };
  const effectiveMonth = month + (dayRanges[descriptor].monthOffset || 0);
  for (let day = dayRanges[descriptor].first; day <= dayRanges[descriptor].last; day += 1) {
    const candidateDate = new Date(year, effectiveMonth, day);
    if (candidateDate.getMonth() !== month) throw new Error('Date cannot be found given the description');
    if (candidateDate.getDay() === daysOfWeek[dayOfWeek]) return candidateDate;
  }
};
