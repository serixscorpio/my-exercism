const ELEMENT = {
  init(value, next) {
    this.value = value;
    this.next = next;
    return this;
  },
  append(list) {
    return list.foldl((accumulator, item) => accumulator.push(item), this);
  },
  concat(lists) {
    return lists.foldl((accumulator, list) => accumulator.append(list), this);
  },
  filter(fn) {
    if (fn(this.value)) {
      return Object.create(ELEMENT).init(this.value, this.next.filter(fn));
    }
    return this.next.filter(fn);
  },
  foldl(fn, init) {
    return this.next.foldl(fn, fn(init, this.value));
  },
  foldr(fn, init) {
    return fn(this.next.foldr(fn, init), this.value);
  },
  length() {
    return 1 + this.next.length();
  },
  map(fn) {
    return Object.create(ELEMENT).init(fn(this.value), this.next.map(fn));
  },
  push(value) {
    this.next = this.next.push(value);
    return this;
  },
  get values() {
    return [this.value, ...this.next.values];
  },
};

const EMPTY = {
  init() {
    this.value = undefined;
    this.next = this.value;
    return this;
  },
  append(list) {
    return list;
  },
  concat(lists) {
    return lists.foldl((accumulator, list) => accumulator.append(list), this);
  },
  filter() {
    return this;
  },
  foldl(_fn, init) {
    return init;
  },
  foldr(_fn, init) {
    return init;
  },
  length() {
    return 0;
  },
  map() {
    return this;
  },
  push(value) {
    return Object.create(ELEMENT).init(value, this);
  },
  get values() {
    return [];
  },
};

function fromArray([first, ...rest]) {
  if (first === undefined) return Object.create(EMPTY).init();
  return Object.create(ELEMENT).init(first, fromArray(rest));
}

export function List(input = []) {
  return fromArray(input);
}
