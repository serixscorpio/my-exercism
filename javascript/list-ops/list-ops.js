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
  foldl(fn, init) {
    return this.next.foldl(fn, fn(init, this.value));
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
  foldl(_fn, init) {
    return init;
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
