const app = require('express')();
const https = require('https');
const cors = require('cors')

app.use(cors())

app.get('/:username', async (req, res) => {
    if (req.params.username.startsWith('@')) req.params.username = req.params.username.substr(1)

    https.get(`https://medium.com/feed/@${req.params.username}`, (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => res.json(data));
    }).on("error", err => res.send(err));
})

app.listen(process.env.PORT || 3001);
