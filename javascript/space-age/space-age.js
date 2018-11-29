export class SpaceAge {
  constructor(seconds) {
    this.seconds = seconds;
    [
      { planet: 'Earth', ratio: 1 },
      { planet: 'Mercury', ratio: 0.2408467 },
      { planet: 'Venus', ratio: 0.61519726 },
      { planet: 'Mars', ratio: 1.8808158 },
      { planet: 'Jupiter', ratio: 11.862615 },
      { planet: 'Saturn', ratio: 29.447498 },
      { planet: 'Uranus', ratio: 84.016846 },
      { planet: 'Neptune', ratio: 164.79132 },
    ].forEach(({ planet, ratio }) => {
      this[`on${planet}`] = () => Number((this.seconds / 31557600 / ratio).toFixed(2));
    });
  }
}
