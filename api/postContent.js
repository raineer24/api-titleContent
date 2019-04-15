const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

router.get('/', (req, res) => {
    queries.getAll().then(content => {
        res.json(content);
    });
 });

router.get('/:id', isValidId, (req,res, next) => {
    queries.getOne(req.params.id).then(content => {
        if (content) {
            res.json(content);
        } else{
            next();
        }
    });
})

module.exports = router;
