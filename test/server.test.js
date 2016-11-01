const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/server');
const fs = require('fs');

describe('http-server', () => {
  const request = chai.request(server);
  it('responds corrects to a "GET" request on "/"', done => {
    request
      .get('/')
      .end((err, res) => {
        if(err) return done(err);
        assert.equal(res.text, 'Welcome to my http-server');
        done();
      });
  });

  it('successfully posts a resource', done => {
    request
      .post('/it-doesnt-matter')
      .send({ title: 'cat', body: 'get your cat' })
      .end((err, res) => {
        if(err) return done(err);
        assert.isOk(fs.existsSync('./notes/cat.json'));
        assert.equal(res.text, 'cat : get your cat');
        done();
      });
  });

  // it('responds correctly to a "GET" request on a resource', done => {
  //   request
  //     .get('/notes/cat')
  //     .end((err, res) => {
  //       if(err) return done(err);
  //       assert.equal(res.text, 'cat : get your cat');
  //       done();
  //     });
  // });

  // it('responds correctly to a "GET" request on all resources', done => {
  //   done();
  // });
});
