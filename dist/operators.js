var Observable_1 = require('./Observable');
//operators
function map(predicate, stream) {
    var res = [];
    stream.subscribe(function (result) {
        res.push(result);
    });
    return new Observable_1.Stream(new Map(predicate, res));
}
exports.map = map;
function fromArray(values) {
    return new Observable_1.Stream(new FromArray(values));
}
exports.fromArray = fromArray;
var FromArray = (function () {
    function FromArray(values) {
        this.values = values;
    }
    FromArray.prototype.run = function (listner) {
        this.values.forEach(listner.next);
    };
    return FromArray;
})();
exports.FromArray = FromArray;
var PushArray = (function () {
    function PushArray(values) {
        this.values = values;
    }
    PushArray.prototype.run = function (listner) {
        listner.next(this.values);
    };
    return PushArray;
})();
exports.PushArray = PushArray;
var Map = (function () {
    function Map(valueFn, vals) {
        this.valueFn = valueFn;
        this.vals = vals;
    }
    Map.prototype.run = function (listner) {
        var _this = this;
        this.vals.forEach(function (x) {
            listner.next(_this.valueFn(x));
        });
    };
    return Map;
})();
exports.Map = Map;
