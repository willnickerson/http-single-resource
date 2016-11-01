const handle = require('./requestHandler');

module.exports = function(url, request, response) {
  const path = url.pathname;
  console.log('path', path);
  const pathArray = path.split('/');
  const fileName = pathArray[pathArray.length - 1];

  if(request.method === 'GET') {
    console.log('Request to get data');
    if(path === '/') {
      response.write('Welcome to my http-server');
      response.end();
    } else if(path === '/notes') {
      handle.getAll(request, response);
    } else {
      handle.get(fileName, request, response);
    }
  } else if(request.method === 'POST') {
    if(request.headers['content-type'] === 'application/json') {
      handle.post(request, response);
    } else {
      response.statusCode = 400;
      response.write('Sorry you have tried to post and invalid data type');
      response.end();
    }
  } else if(request.method === 'DELETE') {
    handle.delete(fileName, request, response);
  } else if(request.method === 'PUT') {
    if(request.headers['content-type'] === 'application/json') {
      handle.put(fileName, request, response);
    } else {
      response.statusCode = 400;
      response.write('Sorry you have tried to post and invalid data type');
      response.end();
    }
  } else {
    response.statusCode = 404;
    response.write(`${response.statusCode} ERROR UNRECOGNIZED REQUEST`);
    response.end();
  }
};
