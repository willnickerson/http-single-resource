const sander = require('sander');
// const readBody = require('./readBody');

const fileSystem = {};

fileSystem.readDir = function() {
  return sander.readdir('./notes');
};

fileSystem.create = function(title, data) {
  return sander.writeFile('./notes', title + '.json', data);
};


fileSystem.read = function(title) {
  return sander.readFile('./notes/' + title + '.json', {encoding: 'utf-8'});
};

fileSystem.destroy = function(title) {
  return sander.unlink('./notes/' + title + '.json');
};


module.exports = fileSystem;
