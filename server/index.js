const express = require('express');
const app = express();

const redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/callback';

