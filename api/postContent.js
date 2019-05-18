const express = require('express');
const multer = require('multer');

// const upload = multer({ dest: "uploads/" });
const router = express.Router();

const queries = require('../db/queries');

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter: imageFilter });

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dwsbpkgvr',
  api_key: '246382268158277',
  api_secret: 'OEJwFk8xMOuNID7Z7L5MNDJ9nY8',
});

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

router.post('/upload', upload.single('image'), (req, res, next) => {
  // if (validContent(req.body)) {
  //     console.log('tae')
  //   // insert into db
  //   queries.create(req.body).then((contents) => {
  //     res.json(contents[0]);
  //   });
  // } else {
  //   next(new Error('Invalid Content'));
  // }
  cloudinary.uploader.upload(req.file.path, (result) => {
    // add cloudinary url for the image to the campground object under image property
    console.log(result);
    // add author to campground
    // req.body.campground.author = {
    //   id: req.user._id,
    //   username: req.user.username
    // };
  });
});

router.post('/', upload.single('image'), (req, res, next) => {
  if (validContent(req.body)) {
    console.log('tae');
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
