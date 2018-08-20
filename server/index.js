const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request');

const redirect_uri =
  process.env.REDIRECT_URI || 'http://localhost:8080/callback';

app.get('/', (req, res, next) => {
  res.send('you at the spot b');
});

app.get('/login', (req, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri
      })
  );
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    console.log(error);
    let access_token = body.access_token;
    console.log(access_token);
    let uri = 'http://localhost:8081';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

const port = process.env.PORT || 8080;
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
);
app.listen(port);
