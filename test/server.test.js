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

  it('responds correctly to a "GET" request on a resource', done => {
    request
      .get('/notes/cat')
      .end((err, res) => {
        if(err) return done(err);
        assert.equal(res.text, 'cat : get your cat');
        done();
      });
  });

  request
    .post('/notes')
    .send({ title: 'mail', body: 'get your mail' })
    .end(() => console.log('we added another resource'));

  request
    .post('/notes')
    .send({ title: 'trash', body: 'get your trash' })
    .end(() =>  console.log('we added another resource'));

  it('responds correctly to a "GET" request on all resources', done => {
    request
      .get('/notes')
      .end((err, res) => {
        if(err) return done(err);
        assert.include(res.text, 'cat');
        assert.include(res.text, 'mail');
        assert.include(res.text, 'trash');
        done();
      });
  });

  it('responds correcty to a PUT request', done => {
    request
      .put('/notes/cat')
      .send({ title: 'test', body: 'it worked!' })
      .end((err, res) => {
        if(err) return done(err);
        assert.equal(res.text, 'You have updated cat to - test : it worked!');
        done();
      });
  });

  it('responds correctly to a delete request', done => {
    request
      .delete('/notes/cat')
      .end((err, res) => {
        if(err) return done(err);
        assert.isNotOk(fs.existsSync('./notes/cat.json'));
        assert.equal(res.text, 'cat has been destroyed!');
        done();
      });
  });
});
