/* OLOO style
 * Usage:
 *   const year = Object.create(Year);
 *   year.init(2015);
 *   year.isLeap();
 */
export default {
  init(year) {
    this.year = year;
  },
  isLeap() {
    if (this.year % 400 === 0) return true;
    if (this.year % 100 === 0) return false;
    return this.year % 4 === 0;
  },
};

/* constructor style
 * Usage:
 *   const year = new Year(2015);
 *   year.isLeap();
 */
// export default class Year {
//   constructor(year) {
//     this.year = year;
//   }
//   isLeap() {
//     if (this.year % 400 === 0) return true;
//     if (this.year % 100 === 0) return false;
//     return this.year % 4 === 0;
//   }
// }
