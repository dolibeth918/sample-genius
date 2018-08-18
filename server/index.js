const express = require('express');
const app = express();
const queryString = require('query-string');

const redirect_uri =
  process.env.REDIRECT_URI || 'http://localhost:8888/callback';

app.get('/login', (req, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      queryString.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri
      })
  );
});
