const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    
}

router.get('/', (req, res) => {
    queries.getAll().then(contents => {
        res.json(contents)
    })
});

module.exports = router;
