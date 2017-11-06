const express = require('express');
const webapi = express();
const jsmap = express();

webapi.listen(25001, function() {
    console.log('Example app listening on port 25001!')
});

jsmap.listen(25002, function() {
    console.log('Example app listening on port 25002!')
})

webapi.use(express.static('map'));
jsmap.use(express.static('map'));

webapi.get('/', function(req, res) {
    res.send('25001');
})

webapi.get('/as/webapi/js/auth', function(req, res) {
    if (req.query.m === 'plugins/Tool') {
        res.redirect(301, '/as/webapi/js/auth?t=tool')
    }
    const t = req.query.t;
    res.sendfile(`src/map/auth/${t}`, { root: __dirname });
});

jsmap.get('/', function(req, res) {
    res.send('25002');
})