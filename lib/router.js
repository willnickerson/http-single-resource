const handle = require('./requestHandler');

module.exports = function(url, request, response) {
  const path = url.pathname;
  if(request.method === 'GET') {
    console.log('Request to get data');
    handle.get(path, request, response);
  } else if(request.method === 'POST') {
    handle.post(request, response);
  } else if(request.method === 'DELETE') {
    //delete note
    console.log('request to delete');
    response.write('request to delete');
    response.write('DELETE');
  } else {
    response.statusCode = 404;
    response.write(`${response.statusCode} ERROR UNRECOGNIZED REQUEST`);
    response.end();
  }
};
