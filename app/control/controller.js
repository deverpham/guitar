"use strict";
var exec = require('exec');
var request = require('request');
function default_1(app) {
    app.get('/', function (req, res) {
        var css = [
            'materialize',
            'hack',
            'style'
        ];
        var js = [
            'jquery.min',
            'TweenMax.min',
            'style'
        ];
        res.render('index', {
            cssel: css,
            jsel: js
        });
    });
    app.post('/getchord', function (req, res) {
        var youtube = "youtube:" + req.body.pseudoId;
        console.log(youtube);
        request.get('https://chordify.net/song/' + youtube, {}, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                res.send(body);
            }
        });
    });
    app.get('/playchord/:slug', function (req, res) {
        var slug = req.params.slug;
        var data;
        var str = 'https://chordify.net/song/data/' + slug;
        request.get(str, {}, function (er, rs, body) {
            try {
                var data_1 = JSON.parse(body);
                data_1.chords = data_1.chords.split("\n");
                res.render('player', {
                    jsondata: data_1,
                    videoId: slug,
                    cssel: '',
                    jsel: [
                        'jquery.min',
                        'youtube'
                    ]
                });
            }
            catch (ex) {
                res.send('not found');
            }
        });
    });
    app.post('/api/getinfo/:slug', function (req, res) {
        var slug = req.params.slug;
        var data;
        var str = 'https://chordify.net/song/data/' + slug;
        request.get(str, {}, function (er, rs, body) {
            try {
                var data_2 = JSON.parse(body);
                data_2.chords = data_2.chords.split("\n");
                res.send(data_2);
            }
            catch (ex) {
                res.send('not found');
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
