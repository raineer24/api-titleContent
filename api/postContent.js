const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const router = express.Router();

const queries = require('../db/queries');

const storage = multer.diskStorage({
destination: function (req, file, cb) {
 cb(null, 'public/uploads/')
},

 filename: function (req, file, cb) {
 console.log(file);
 let extArray = file.mimetype.split("/");
let extension = extArray[extArray.length - 1];
// cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
 cb(null, file.originalname + '-' + Date.now() + '.' + extension);
}
})

//const upload = multer({ storage: storage }).single('image');

// eslint-disable-next-line consistent-return
function isValidId(req, res, next) {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validContent(content) {
  // eslint-disable-next-line no-multi-spaces
  const hasTitle =    typeof content.title === 'string' && content.title.trim() !== '';
  // eslint-disable-next-line no-multi-spaces
  const hasContent =    typeof content.content === 'string' && content.content.trim() !== '';
  return hasTitle && hasContent;
}

router.get('/', (req, res) => {
  const { title, content } = req.query;
  queries.getAll({ title, content }).then((contents) => {
    res.json(contents);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then((content) => {
    if (content) {
      res.json(content);
    } else {
      next();
    }
  });
});

router.post('/upload',upload.single('image'),(req, res, next) => {

  // if (validContent(req.body)) {
  //     console.log('tae')
  //   // insert into db
  //   queries.create(req.body).then((contents) => {
  //     res.json(contents[0]);
  //   });
  // } else {
  //   next(new Error('Invalid Content'));
  // }
  console.log(req.body);
  console.log(req.file);
  res.send('Hello')
});

router.post('/', upload.single('image'), (req, res, next) => {

  if (validContent(req.body)) {
      console.log('tae')
    // insert into db
    queries.create(req.body).then((contents) => {
      res.json(contents[0]);
    });
  } else {
    next(new Error('Invalid Content'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if (validContent(req.body)) {
    // update the Content
    queries.update(req.params.id, req.body).then((contents) => {
      res.json(contents[0]);
    });
  } else {
    next(new Error('Invalid Content'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true,
    });
  });
});

module.exports = router;
