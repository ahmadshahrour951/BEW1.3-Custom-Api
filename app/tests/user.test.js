require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
// const faker = require('faker');

const app = require('../../server');
const db = require('../models');

const expect = chai.expect;
chai.use(chaiHttp);
const agent = chai.request.agent(app);

describe('User API Endpoints', () => {
  beforeEach((done) => {
    db.users
      .create({
        id: 1,
        email: 'test@gmail.com',
        name: 'test',
      })
      .then(() => {
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  afterEach((done) => {
    db.users
      .destroy({
        where: {},
        cascade: true,
      })
      .then(() => {
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should load all users', (done) => {
    agent.get('/api/users').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('Should get one user', (done) => {
    agent.get('/api/users/1').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('email', 'test@gmail.com');
      expect(res.body).to.have.property('name', 'test');
      done();
    });
  });

  it('Should create one user', (done) => {
    agent
      .post('/api/users')
      .send({ id: 2, email: 'test_2@gmail.com', name: 'test_2' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 2);
        expect(res.body).to.have.property('email', 'test_2@gmail.com');
        expect(res.body).to.have.property('name', 'test_2');

        db.users.findByPk(2).then((user) => {
          expect(user).to.be.an('object');
          expect(user).to.have.property('id', 2);
          expect(user).to.have.property('email', 'test_2@gmail.com');
          expect(user).to.have.property('name', 'test_2');
          done();
        });
      });
  });

  it('Should update one user', (done) => {
    agent
      .put('/api/users/1')
      .send({ id: 1, email: 'test_2@gmail.com', name: 'test_2' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          'message',
          'User updated successfully'
        );
        expect(res.body).to.have.property('user', 1);

        db.users.findByPk(1).then((user) => {
          expect(user).to.be.an('object');
          expect(user).to.have.property('id', 1);
          expect(user).to.have.property('email', 'test_2@gmail.com');
          expect(user).to.have.property('name', 'test_2');
          done();
        });
      });
  });

  it('Should delete one user', (done) => {
    agent.delete('/api/users/1').end((err, res) => {
      if (err) { done(err)}
      expect(res).to.have.status(200);
      expect(res.body).to.have.property(
        'message',
        'User deleted successfully'
      );
      expect(res.body).to.have.property('user', 1);

      db.users.findByPk(1).then((user) => {
        expect(user).to.equal(null)
        done()
      })
    })
  })
});
