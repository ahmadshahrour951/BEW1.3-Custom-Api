require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const app = require('../../server');
const db = require('../models');

const expect = chai.expect;
chai.use(chaiHttp);
const agent = chai.request.agent(app);

describe('Institution API Endpoints', () => {
  beforeEach((done) => {
    db.institutions
      .create({
        id: 1,
        name: 'test_1',
        max_capacity: 2,
      })
      .then(() => {
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  afterEach((done) => {
    db.institutions
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

  it('Should load all institutions', (done) => {
    agent.get('/api/institutions').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('Should get one institution', (done) => {
    agent.get('/api/institutions/1').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('max_capacity', 'test@gmail.com');
      expect(res.body).to.have.property('name', 'test');
      done();
    });
  });

  it('Should create one institution', (done) => {
    agent
      .post('/api/institutions')
      .send({ id: 2, max_capacity: 2, name: 'test_2' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 2);
        expect(res.body).to.have.property('max_capacity', 2);
        expect(res.body).to.have.property('name', 'test_2');

        db.institutions.findByPk(2).then((institution) => {
          expect(institution).to.be.an('object');
          expect(institution).to.have.property('id', 2);
          expect(institution).to.have.property('max_capacity', 2);
          expect(institution).to.have.property('name', 'test_2');
          done();
        });
      });
  });

  it('Should update one institution', (done) => {
    agent
      .put('/api/institutions/1')
      .send({ id: 1, max_capacity: 2, name: 'test_2' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          'message',
          'Institution updated successfully'
        );
        expect(res.body).to.have.property('institution', 1);

        db.institutions.findByPk(1).then((institution) => {
          expect(institution).to.be.an('object');
          expect(institution).to.have.property('id', 1);
          expect(institution).to.have.property('max_capacity', 2);
          expect(institution).to.have.property('name', 'test_2');
          done();
        });
      });
  });

  it('Should delete one institution', (done) => {
    agent.delete('/api/institutions/1').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.have.property(
        'message',
        'Institution deleted successfully'
      );
      expect(res.body).to.have.property('institution', 1);

      db.institutions.findByPk(1).then((institution) => {
        expect(institution).to.equal(null);
        done();
      });
    });
  });
});
