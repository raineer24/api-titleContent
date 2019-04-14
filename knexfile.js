// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nerstore',
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/dummynerstore',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
  };