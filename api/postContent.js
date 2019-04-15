const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validContent(content) {
    const hasTitle = typeof content.title == 'string' && content.title.trim() != '';
    const hasContent = typeof content.content == 'string' && content.content.trim() != '';
    return hasTitle && hasContent;
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
});

router.post('/', (req, res, next) => {
    if (validContent(req.body)) {
        // insert into db
        queries.create(req.body).then(contents => {
            res.json(contents[0]);
        });
    } else {
        next(new Error('Invalid Content'));
    }
});

module.exports = router;
