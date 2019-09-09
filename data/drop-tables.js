const client = require('../lib/utils/client');

client.query(`
  DROP TABLE IF EXISTS dogs;
`)
  .then(
    () => console.log('dop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
