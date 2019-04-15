const request = require('supertest');
const knex = require('../db/knex');
const expect = require('chai').expect;

const app = require('../app');

const fixtures = require('./fixtures');

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
                expect(response.body).to.deep.equal(fixtures.contents)
                done();
            });

    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/v1/content/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.contents[0]);
                done();
            });

    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/v1/content/5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.contents[4]);
                done();
            });

    });

    
});