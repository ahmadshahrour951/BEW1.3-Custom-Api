require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const app = require('../../server');
const db = require('../models');

const expect = chai.expect;
chai.use(chaiHttp);
const agent = chai.request.agent(app);

describe('Event API Endpoints', () => {});
