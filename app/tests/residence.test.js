require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../server');
const db = require('../models');

const expect = chai.expect;
chai.use(chaiHttp);
const agent = chai.request.agent(app);


describe('Residence API Endpoints', () => {
  beforeEach((done) => {
    db.residences
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
    db.residences
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

  it('Should load all residences', (done) => {
    agent.get('/api/residences').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('Should get one residence', (done) => {
    agent.get('/api/residences/1').end((err, res) => {
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

  it('Should create one residence', (done) => {
    agent
      .post('/api/residences')
      .send({ id: 2, max_capacity: 2, name: 'test_2' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id', 2);
        expect(res.body).to.have.property('max_capacity', 2);
        expect(res.body).to.have.property('name', 'test_2');

        db.residences.findByPk(2).then((residence) => {
          expect(residence).to.be.an('object');
          expect(residence).to.have.property('id', 2);
          expect(residence).to.have.property(
            'max_capacity',
            2
          );
          expect(residence).to.have.property('name', 'test_2');
          done();
        });
      });
  });

  it('Should update one residence', (done) => {
    agent
      .put('/api/residences/1')
      .send({ id: 1, max_capacity: 2, name: 'test_2' })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          'message',
          'Residence updated successfully'
        );
        expect(res.body).to.have.property('residence', 1);

        db.residences.findByPk(1).then((residence) => {
          expect(residence).to.be.an('object');
          expect(residence).to.have.property('id', 1);
          expect(residence).to.have.property(
            'max_capacity',
            2
          );
          expect(residence).to.have.property('name', 'test_2');
          done();
        });
      });
  });

  it('Should delete one residence', (done) => {
    agent.delete('/api/residences/1').end((err, res) => {
      if (err) {
        done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Residence deleted successfully');
      expect(res.body).to.have.property('residence', 1);

      db.residences.findByPk(1).then((residence) => {
        expect(residence).to.equal(null);
        done();
      });
    });
  });
});
