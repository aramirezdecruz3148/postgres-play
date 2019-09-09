const client = require('../lib/utils/client');

client.query(`
  CREATE TABLE dogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    breed VARCHAR(256) NOT NULL,
    is_certified BOOLEAN
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
