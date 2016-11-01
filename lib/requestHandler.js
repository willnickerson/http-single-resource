// const sander = require('sander');
const readBody = require('./readBody');
const fileSystem = require('./fileSystem');
const handle = {};

handle.post = function(request, response) {
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

handle.put = function(fileName, request, response) {
  readBody(request, (err, note) => {
    if(err) {
      response.statusCode = 400;
      response.write(err.message);
    } else {
      response.statusCode = 200;
      fileSystem.create(fileName, JSON.stringify(note))
        .then(() => {
          return fileSystem.read(fileName);
        })
        .then(data => {
          let parsedNote = JSON.parse(data);
          response.write(`You have updated ${fileName} to - ${parsedNote.title} : ${parsedNote.body}`);
          response.end();
        });
    }
  });
};

handle.delete = function(fileName, request, response) {
  return fileSystem.destroy(fileName)
    .then(() => {
      response.write(`${fileName} has been destroyed!`);
      response.end();
    });
};

handle.get = function(fileName, request, response) {
  fileSystem.read(fileName)
  //this is literally repeat code. put it into a function;
  .then((data) => {
    let parsedNote = JSON.parse(data);
    response.write(`${parsedNote.title} : ${parsedNote.body}`);
    response.end();
  });
};

handle.getAll = function(request, response) {
  fileSystem.readDir()
  .then((data) => {
    return data.map(fileName => {
      let file = fileName.replace('.json', '');
      return fileSystem.read(file);
    });
  })
  .then(promises => Promise.all(promises))
  .then(data => data.map(note => JSON.parse(note)))
  .then(data => data.map(obj => `${obj.title} : ${obj.body}`))
  .then(data => {
    let list = '';
    data.forEach(str => {
      list += `${str} \n`;
    });
    response.write(list);
    return response.end();
  });
};


module.exports = handle;
