// adding a generic method to array i na fancy way, so we can operate directly on the
// array rather than having to write an "own" method...
Array.prototype.getIndexByPredicate = function (fPredicate) {
    for (var i = 0; i < this.length; ++i) {
        if (fPredicate(this[i])) {
            return i;
        }
    }
    return -1;
};