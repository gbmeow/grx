function subscribe(atSubscribe, stream) {
    var listener = {
        next: atSubscribe,
        error: function (err) {
            console.log(err);
        },
        complete: function () {
            console.log('complete');
        }
    };
    var disposable = stream.source.run(listener);
}
exports.subscribe = subscribe;
