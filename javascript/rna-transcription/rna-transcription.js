export function toRna(nucleotides) {
  const complement = {
    C: 'G',
    G: 'C',
    A: 'U',
    T: 'A',
  };

  function singleDnaToRna(nucleotide) {
    return complement[nucleotide] || (() => { throw new Error('Invalid input DNA.'); })();
  }

  return nucleotides.split('').map(singleDnaToRna).join('');
}
