const http = require('http');
const parseUrl = require('url').parse;
const route = require('./router');

const server = http.createServer((request, response) => {
  const url = parseUrl(request.url);
  route(url, request, response);
});

const port = 8080;
server.listen(port, err => {
  if(err) console.log(err);
  else console.log('Server listening on port: ', port);
});

module.exports = server;
