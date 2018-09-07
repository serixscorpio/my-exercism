function isPrime(num) {
  for (let i = 2; i < num; i += 1) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

export default class {
  constructor(p, g) {
    if (p < 2 || p > 9999 || g < 2 || g > 9999) { throw new Error('an argument is out of range'); }
    if (!(isPrime(p) && isPrime(g))) { throw new Error('an argument is not prime'); }
    this.p = p;
    this.g = g;
  }

  getPublicKeyFromPrivateKey(privateKey) {
    if (privateKey <= 1) { throw new Error('private key is less or equal to 1'); }
    if (privateKey >= this.p) { throw new Error('private key is greater or equal to modulus parameter'); }
    return this.g ** privateKey % this.p;
  }

  getSharedSecret(privateKey, publicKey) {
    return publicKey ** privateKey % this.p;
  }
}
