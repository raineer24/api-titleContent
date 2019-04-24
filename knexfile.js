module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/storener',
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