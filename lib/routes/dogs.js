const { Router } = require('express');
const client = require('../utils/client');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, breed, isCertified } = req.body;

    client.query(`
      INSERT INTO dogs (name, breed, is_certified)
      VALUES ($1, $2, $3)
      RETURNING
        id, name, breed, is_certified as "isCertified";
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
  })

  .get('/:id', (req, res, next) => {
    client.query(`
      SELECT
        id, 
        name,
        breed,
        is_certified as "isCertified"
      FROM dogs
      WHERE id = $1;
    `,
    [req.params.id]
    )
      .then(result => {
        const dog = result.rows[0];
        if(!dog) {
          throw {
            status: 404,
            message: `Id ${req.params.id} does not exist in records.`
          };
        }
        res.send(dog);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { isCertified } = req.body;

    client.query(`
      UPDATE dogs 
        SET is_certified = $1
      WHERE id = $2
      RETURNING
        id, name, breed, is_certified as "isCertified"
    `,
    [isCertified, req.params.id]
    )
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    client.query(`
      DELETE FROM dogs
      WHERE id = $1
      RETURNING
        id, name, breed, is_certified as "isCertified";
    `,
    [req.params.id]
    )
      .then(result => {
        res.send(result.rows[0]);
      })
      .catch(next);
  });
