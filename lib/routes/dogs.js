const { Router } = require('express');
const client = require('../utils/client');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, breed, isCertified } = req.body;

    client.query(`
      INSERT INTO dogs (name, breed, is_certified)
      VALUES ($1, $2, $3)
      RETURNING
        id, name, breed, is_certified;
    `,
    [name, breed, isCertified]
    )
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    client.query(`
      SELECT
        id, 
        name, 
        breed,
        is_certified as "isCertified"
      FROM dogs;
    `)
      .then(result => {
        res.send(result.rows);
      })
      .catch(next);
  });
