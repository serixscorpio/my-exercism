const HEAD = {
  init(value, next) {
    this.value = value;
    this.next = next;
    return this;
  },
  foldl(fn, init) {
    this.next.foldl(fn, fn(init, this.value));
  },
  push(value) {
    this.next = this.next.push(value);
    return this;
  },
};

const EMPTY = {
  append(list = EMPTY) {
    if (list === EMPTY) return EMPTY;
    return list;
  },
  foldl(_fn, init) {
    return init;
  },
  push(value) {
    return Object.create(HEAD).init(value, EMPTY);
  },
};

function fromArray([first, ...rest]) {
  if (first === undefined) return EMPTY;
  return Object.create(HEAD).init(first, fromArray(rest));
}

export function List(input = []) {
  return fromArray(input);
}
