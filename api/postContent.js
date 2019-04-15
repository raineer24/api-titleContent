const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

router.get('/', isValidId, (req, res) => {
    queries.getAll().then(contents => {
        res.json(contents)
    })
});

module.exports = router;
