const request = require('supertest');
const knex = require('../db/knex');

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

    it('List all records', () => {
        request(app)  
        .get('/api/v1/content')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);

    });
});