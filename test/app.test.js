const knex =require('../db/knex');

describe('POST Content', () => {
    before(() => {
        //run migrations
        Knex.migrate.latest()
            .then(() => {
                //run seeds
                return knex.seed.run();
            })
        
    });
});