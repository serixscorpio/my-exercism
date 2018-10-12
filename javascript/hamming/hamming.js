export default {
  compute(firstStrand, secondStrand) {
    if (firstStrand.length !== secondStrand.length) {
      throw new Error('left and right strands must be of equal length');
    }
    let distance = 0;
    for (let i = 0; i < firstStrand.length; i += 1) {
      if (firstStrand[i] !== secondStrand[i]) distance += 1;
    }
    return distance;
  },
};
