// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/storener',
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/dummystorener',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
  };