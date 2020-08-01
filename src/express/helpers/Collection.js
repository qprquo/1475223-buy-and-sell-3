'use strict';

const Paginator = require(`./paginator/Paginator`);

class Collection {
  constructor(items = [], totalPages, currentPage) {
    this._paginator = new Paginator(totalPages, currentPage);
    this._items = items;
  }

  [Symbol.iterator]() {
    return this._items.items.values();
  }

  links() {
    return this._paginator.links();
  }

  get items() {
    return this._items.items;
  }

  get total() {
    return this._items.total;
  }

  get length() {
    return this._items.items.length;
  }

  get paginator() {
    return this._paginator;
  }
}

module.exports = Collection;
