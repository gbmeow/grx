var Subscribe_1 = require('./Subscribe');
var operators_1 = require('./operators');
var Stream = (function () {
    function Stream(source) {
        this.source = source;
    }
    Stream.prototype.subscribe = function (atSubscribe) {
        Subscribe_1.subscribe(atSubscribe, this);
    };
    Stream.prototype.map = function (project) {
        return operators_1.map(project, this);
    };
    Stream.prototype.combineLatest = function (combineFn, stream) {
        var x = [];
        var y = [];
        var indexX = 0;
        var indexY = 0;
        this.subscribe(function (y) {
            x.push(y);
        });
        stream.subscribe(function (x) {
            y.push(x);
        });
        return new Stream(new operators_1.PushArray(combineFn(x[indexX++], y[indexY++])));
    };
    return Stream;
})();
exports.Stream = Stream;
