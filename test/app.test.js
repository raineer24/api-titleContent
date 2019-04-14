const request = require('supertest');
const knex = require('../db/knex');
const expect = require('chai').expect;

const app = require('../app');

describe('POST Content', () => {
    before((done) => {
        //run migrations
        knex.migrate.latest()
            .then(() => {
                //run seeds
                return knex.seed.run();
            }).then(() => done());

    });

    it('List all Records', (done) => {
        request(app)
            .get('/api/v1/content')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                console.log(response.body);
                done();
            });

    });
});