const knex = require('../db/knex');

describe('POST Content', () => {
    before((done) => {
        //run migrations
        Knex.migrate.latest()
            .then(() => {
                //run seeds
                return knex.seed.run();
            }).then(() => done());

    });

    it('Works...', function () {
        console.log('its working!');

    });
});