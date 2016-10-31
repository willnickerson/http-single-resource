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

handle.put = function(fileName, request, response) {
  console.log('were hitting it');
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
  console.log(fileName);
  fileSystem.read(fileName)
  //this is literally repeat code. put it into a function;
  .then((data) => {
    let parsedNote = JSON.parse(data);
    response.write(`${parsedNote.title} : ${parsedNote.body}`);
    response.end();
  });
};

handle.getAll = function(request, response) {
  const allFiles = [];
  const promises = [];
  let list = '';

  fileSystem.readDir()
  .then((data) => {
    data.forEach(fileName => {
      let file = fileName.replace('.json', '');
      console.log(file);
      allFiles.push(file);
      promises.push(fileSystem.read(file));
    });
    console.log('all files', allFiles);
    console.log('promises', promises);
  })
  .then(() => {
    Promise.all(promises)
    .then(promise => {
      console.log(promise);
    })
    .then(() => {
      response.write(list);
      response.end();
    });
  });


  // .then(() => {
  //   allFiles.forEach(fileName => {
  //     return fileSystem.read(fileName)
  //     .then(data => {
  //       console.log('writing to page');
  //       let parsedNote = JSON.parse(data);
  //       list += (`${parsedNote.title} : ${parsedNote.body} \n`);
  //     });
  //   });
  // })
  // .then(() => {
  //   response.write(list);
  //   response.end();
  // });
};


module.exports = handle;
