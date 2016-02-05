module.exports = function (app) {
    app.get('/ping', function (req, res) {
        res.send(200, {text: "All good. You don't need to be authenticated to call this"});
    });
};
