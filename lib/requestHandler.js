// const sander = require('sander');
const readBody = require('./readBody');
const fileSystem = require('./fileSystem');
const handle = {};

handle.post = function(request, response) {
  console.log('header', request.headers);
  readBody(request, (err, note) => {
    if(err) {
      response.statusCode = 400;
      response.write(err.message);
    } else {
      response.statusCode = 200;
      fileSystem.create(note.title, JSON.stringify(note))
        .then(() => {
          return fileSystem.read(note.title);
        })
        .then((data) => {
          let parsedNote = JSON.parse(data);
          response.write(`${parsedNote.title} : ${parsedNote.body}`);
          response.end();
        });
    }
  });
};

handle.get = function(path, request, response) {
  console.log(path);
  if(path === '/') {
    //retrieve all files
  } else {
    const pathArray = path.split('/');
    const fileName = pathArray[pathArray.length - 1];
    fileSystem.read(fileName)
    //this is literally repeat code. put it into a function;
      .then((data) => {
        let parsedNote = JSON.parse(data);
        response.write(`${parsedNote.title} : ${parsedNote.body}`);
        response.end();
      });
  }
};

module.exports = handle;
