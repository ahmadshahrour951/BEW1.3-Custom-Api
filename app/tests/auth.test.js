require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJWT = require('chai-jwt');

const bcrypt = require('bcryptjs');

const app = require('../../server');
const db = require('../models');

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJWT);

const agent = chai.request.agent(app);

const institution = {
  name: 'Make School',
};

const residence = {
  name: 'The Herbert Hotel',
  max_capacity: 50,
};

const user = {
  name: 'test',
  email: 'test@test.com',
  password: 'test',
};

let newInstitution;
let newResidence;

db.institutions
      .create(institution)
      .then((institutionResult) => {
        newInstitution = institutionResult;
        return db.residences.create(residence);
      })
      .then((residenceResult) => {
        newResidence = residenceResult;
        return newInstitution.setResidences([residenceResult]);
      })
      .then(() => {
        return bcrypt.hash(user.password, 12);
      })
      .then((hashedPw) => {
        user.password = hashedPw;
        return db.users.create(user);
      })
      .then((userResult) => {
        return newResidence.setUsers([userResult]);
      }).catch(err => {
        console.log(err)
      })


describe('Auth API Endpoints', function () {

  it('Should reject login if user not signed up', function (done) {
    agent
      .post('/api/auth/login')
      .send({ email: 'test_1@test.com', password: 'test' })
      .end(function (err, res) {
        if (err) done(err);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property(
          'message',
          'A user with this email could not be found.'
        );
        done();
      });
  });

  it('Should signup successfully', function (done) {
    agent
      .put('/api/auth/signup')
      .send({
        email: 'test_1@test.com',
        password: 'test',
        name: 'test'
      })
      .end(function (err, res) {
        if (err) done(err);
        console.log(res.body)
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          'message',
          'User successfully created'
        );
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.be.a.jwt;
        expect(res.body.token).to.be.signedWith(process.env.JWT_SECRET);
        expect(res.body.token).to.be.have.property('userId');
        done();
      });
  });

  it('Should login successfully', function (done) {
    agent
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'test' })
      .end(function (err, res) {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Successfully Logged in!');
        expect(res.body.token).to.be.a.jwt;
        expect(res.body.token).to.be.signedWith(process.env.JWT_SECRET);
        expect(res.body.token).to.be.have.property('userId');
        done();
      });
  });
});

db.users
  .destroy({
    where: {},
    cascade: true,
  })
  .then(() => {
    return db.residences.destroy({
      where: {},
      cascade: true,
    });
  })
  .then(() => {
    return db.institutions.destroy({
      where: {},
      cascade: true,
    });
  })
  .catch((err) => {
    console.log(err);
  });

