export class LinkedListNode<T> {
  private _value: T
  private _previous: LinkedListNode<T> | null = null
  private _next: LinkedListNode<T> | null = null
  private _index: number

  constructor(value: T, index: number) {
    this._value = value
    this._index = index
  }

  setNext(v: LinkedListNode<T>) {
    this._next = v
  }

  setPrevious(v: LinkedListNode<T>) {
    this._previous = v
  }

  replace(v: T) {
    const newNode = new LinkedListNode(v, this._index)
    if (this.next) {
      newNode.setNext(this.next)
      this.next.setPrevious(newNode)
    }

    if (this.previous) {
      newNode.setPrevious(this.previous)
      this.previous.setNext(newNode)
    }

    return newNode
  }

  get next() {
    return this._next
  }

  get previous() {
    return this._previous
  }

  get value() {
    return this._value
  }

  get index() {
    return this._index
  }

  get isLast() {
    return this._next === null
  }

  get isFirst() {
    return this._previous === null
  }
}

export function createLinkedList<T>(arr: T[]) {
  if (!arr.length) {
    return null
  }

  const [first, ...rest] = arr

  const firstNode = new LinkedListNode<T>(first, 0)

  const lastNode = rest.reduce((prevNode, curr, index) => {
    const currNode = new LinkedListNode(curr, index + 1)
    currNode.setPrevious(prevNode)
    prevNode.setNext(currNode)

    return currNode
  }, firstNode)

  return { firstNode, lastNode }
}
