const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');
const {JWT_SECRET, TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/users', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const name = 'exampleName';
  const username2 = 'exampleUser2';
  const password2 = 'password2';
  const name2 = 'name2';

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  afterEach(function() {
    return User.remove({});
  });

  after(function() {
    return closeServer();
  });

  describe('/users/signup', function() {
    describe('POST', function() {
      it('Should reject users with missing username', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            password,
            name
          })
          .then(() => 
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with missing password', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            name
          })
          .then(() => 
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string username', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username: 1234,
            password,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-string username', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username: 1234,
            password,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-string password', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password: 1234,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string name', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password,
            name: 1234
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('name');
          });
      });
      it('Should reject users with non-trimmed username', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username: ` ${username} `,
            password,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-trimmed password', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password: ` ${password} `,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with empty username', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username: '',
            password,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 1 characters long'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with username longer than 17 characters', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username: new Array(18).fill('a').join(''),
            password,
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at most 17 characters long'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with password less than five characters', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password: '1234',
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 5 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with password greater than 72 characters', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password: new Array(73).fill('a').join(''),
            name
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at most 72 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with names greater than 17 characters', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password, 
            name: new Array(18).fill('a').join(''),
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at most 17 characters long'
            );
            expect(res.body.location).to.equal('name');
          });
      });
      it('Should reject users with duplicate username', function() {
        return User.create({
          username,
          password,
          name
        })
          .then(() =>
            chai.request(app).post('/users/signup').send({
              username,
              password,
              name
            })
          )
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Username already taken'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should create a new user', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password,
            name
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'id',
              'name',
              'picks',
              'points'
            );
            expect(res.body.username).to.equal(username);
            expect(res.body.name).to.equal(name);
            expect(res.body.picks).to.be.an('object');
            expect(res.body.points).to.equal(0);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.name).to.equal(name);
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
      it('Should trim firstName and lastName', function() {
        return chai
          .request(app)
          .post('/users/signup')
          .send({
            username,
            password,
            name: ` ${name} `,
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'id',
              'name',
              'picks',
              'points'
            );
            expect(res.body.username).to.equal(username);
            expect(res.body.name).to.equal(name);
            expect(res.body.picks).to.be.an('object');
            expect(res.body.points).to.equal(0);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.name).to.equal(name);
            expect(user.picks).to.be.an('object');
            expect(user.points).to.equal(0);
          });
      });
    });

    describe('/users/:username', function() {
      describe('GET', function() {
        it('should return the user info that matches the username', function() {
          return User.hashPassword(password).then(password =>
            User.create({
              username,
              password,
              name
            })
          )
            .then(function(user) {
              chai
                .request(app)
                .get(`/users/${user.username}`)
                .then(res => {
                  expect(res).to.have.status(200);
                  expect(res.body.username).to.equal(username);
                  expect(res.body.name).to.equal(name);
                  expect(res.body.points).to.equal(0);
                  expect(res.body.picks).to.be.an('object');
                });
            });
        });
      });
    });

    describe('/users/all', function() {
      describe('GET', function() {
        it('should return all users in the database', function() {
          return User.create({username, password, name})
            .then(function(user) {
              chai
                .request(app)
                .get('/users/all')
                .then(res => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('array');
                  expect(res.body.length).to.equal(1);
                });
            });
        });
      });
    });

    describe('/users/picks/:username', function() {
      describe('PUT', function() {
        it('should update and return the picks for a specified user', function() {
          const pick = {matchup0: 'Washington'};
          return User.create({username, password, name})
            .then(function(user) {
              chai
                .request(app)
                .put(`/users/picks/${user.username}`)
                .send(pick)
                .then(res => {
                  expect(res).to.have.status(204);
                  User.find({username: username});
                })
                .then(updatedUser => {
                  console.log(updatedUser, 'piandlnafklsdnflkdsa');
                  expect(updatedUser.picks.matchup0).to.equal('Atlanta');
                });
            });
        });
      });
    });
  });
});