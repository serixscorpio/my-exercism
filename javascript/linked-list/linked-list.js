export default function LinkedList() {
  let head = null;
  let tail = null;
  let length = 0;
  return {
    empty() {
      return length === 0;
    },
    push(item) {
      if (this.empty()) {
        tail = { prev: null, next: null, item };
        head = tail;
      } else {
        tail.next = { prev: tail, next: null, item };
        tail = tail.next;
      }
      length += 1;
    },
    pop() {
      const popped = tail;
      if (popped) {
        tail = popped.prev;
        if (tail) tail.next = null;
        length -= 1;
      }
      return popped.item;
    },
    shift() {
      const shifted = head;
      if (shifted) {
        head = shifted.next;
        if (head) head.prev = null;
        length -= 1;
      }
      return shifted.item;
    },
    unshift(item) {
      if (this.empty()) {
        head = { prev: null, next: null, item };
        tail = head;
      } else {
        head.prev = { prev: null, next: head, item };
        head = head.prev;
      }
      length += 1;
    },
    count() {
      return length;
    },
    delete(item) {
      let curr = head;
      while (curr) {
        if (curr.item === item) {
          /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
          curr.prev ? (curr.prev.next = curr.next) : (head = curr.next);
          curr.next ? (curr.next.prev = curr.prev) : (tail = curr.prev);
          length -= 1;
          break;
        }
        curr = curr.next;
      }
    },
  };
}
