const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Picks endpoint', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const name = 'exampleName';

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password => 
      User.create({
        username,
        password,
        name
      })
    );
  });

  afterEach(function() {
    return User.remove({});
  });

  after(function() {
    return closeServer();
  });

  describe('/picks', function() {
    describe('PUT endpoint', function() {
      it('Should reject requests with no credentials', function() {
        return chai
          .request(app)
          .put(`/picks/${username}`)
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(401);
          });
      });
      it('Should reject requests with an invalid token', function() {
        const token = jwt.sign(
          {
            username,
            name
          },
          'wrongSecret',
          {
            algorithm: 'HS256',
            expiresIn: '7d'
          }
        );
        return chai
          .request(app)
          .put(`/picks/${username}`)
          .set('Authorization', `Bearer ${token}`)
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(401);
          });
      });
      it('Should reject requests with an expired token', function() {
        const token = jwt.sign(
          {
            user: {
              username,
              name
            },
            exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: username
          }
        );
        return chai
          .request(app)
          .put(`/picks/${username}`)
          .set('authorization', `Bearer ${token}`)
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
            const res = err.response;
            expect(res).to.have.status(401);
          });
      });
      it('Should update user\'s picks', function() {
        const token = jwt.sign(
          {
            user: {
              username,
              name
            }
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: username,
            expiresIn: '7d'
          }
        );
        return chai
          .request(app)
          .put(`/picks/${username}`)
          .send({'matchup0': 'Atlanta'})
          .set('authorization', `Bearer ${token}`)
          .then(res => {
            expect(res).to.have.status(204);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.picks.matchup0).to.equal('Atlanta');
          });
      });
    });
  });
});