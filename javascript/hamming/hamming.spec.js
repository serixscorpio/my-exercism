import Hamming from './hamming';

describe('Hamming', () => {
  const hamming = Object.create(Hamming);

  test('no difference between empty strands', () => {
    expect(hamming.compute('', '')).toEqual(0);
  });

  test('no difference between identical strands', () => {
    expect(hamming.compute('A', 'A')).toEqual(0);
  });

  test('long identical strands', () => {
    expect(hamming.compute('GGACTGA', 'GGACTGA')).toEqual(0);
  });

  test('complete distance in single nucleotide strands', () => {
    expect(hamming.compute('A', 'G')).toEqual(1);
  });

  test('complete distance in small strands', () => {
    expect(hamming.compute('AG', 'CT')).toEqual(2);
  });

  test('small distance in small strands', () => {
    expect(hamming.compute('AT', 'CT')).toEqual(1);
  });

  test('small distance', () => {
    expect(hamming.compute('GGACG', 'GGTCG')).toEqual(1);
  });

  test('small distance in long strands', () => {
    expect(hamming.compute('ACCAGGG', 'ACTATGG')).toEqual(2);
  });

  test('non-unique character in first strand', () => {
    expect(hamming.compute('AAG', 'AAA')).toEqual(1);
  });

  test('non-unique character in second strand', () => {
    expect(hamming.compute('AAA', 'AAG')).toEqual(1);
  });

  test('same nucleotides in different positions', () => {
    expect(hamming.compute('TAG', 'GAT')).toEqual(2);
  });

  test('large distance', () => {
    expect(hamming.compute('GATACA', 'GCATAA')).toEqual(4);
  });

  test('large distance in off-by-one strand', () => {
    expect(hamming.compute('GGACGGATTCTG', 'AGGACGGATTCT')).toEqual(9);
  });

  test('disallow first strand longer', () => {
    expect(() => hamming.compute('AATG', 'AAA')).toThrow(
      new Error('left and right strands must be of equal length'),
    );
  });

  test('disallow second strand longer', () => {
    expect(() => hamming.compute('ATA', 'AGTG')).toThrow(
      new Error('left and right strands must be of equal length'),
    );
  });
});
