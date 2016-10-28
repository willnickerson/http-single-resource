const sander = require('sander');
// const readBody = require('./readBody');

const fileSystem = {};

fileSystem.create = function(title, data) {
  return sander.writeFile('./notes', title + '.json', data);
};

module.exports = fileSystem;

fileSystem.read = function(title) {
  return sander.readFile('./notes/' + title + '.json', {encoding: 'utf-8'});
};

fileSystem.destroy = function(title) {
  return sander.unlink('./notes/' + title + '.json');
};

// fileSystem.update = function(request) {
//   //update file given request url and data
// };

// fileSystem.create('test', '{"this": "is a test"}')
//   .then(() => {
//     return fileSystem.read('test');
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .then(() => {
//     fileSystem.destroy('test');
//   });
