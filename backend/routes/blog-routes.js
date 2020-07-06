const router = require('express').Router();
// ****************************************
//  BLOG ROUTES
// ****************************************
// POST
const Blog = require('../models/BlogSchema');

router.post('/create-blog', (req, res, next) => {
  let blogCreationDate = new Date();
  console.log(blogCreationDate);
  const newestBlog = new Blog({
    userId: req.body.userId,
    blogTitle: req.body.blogTitle,
    blogDescription: req.body.blogDescription,
    blogCoverImage: req.body.blogCoverImage,
    blogCreationDate: blogCreationDate
  });
  newestBlog
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

// PUT UPDATE
router.post('/update-blog/:blogId', (req, res, next) => {
  res.send(req.body);
  next();
});

// GET ALL BLOGS
router.get('/get-all-blogs', (req, res, next) => {
  res.send(req.body);
  next();
});

// GET USER BLOGS
router.get('/get-users-blogs/:userId', (req, res, next) => {
  res.send(req.body);
  next();
});

// GET SINGLE BLOG
router.get('/get-blog/:blogId', (req, res, next) => {
  console.log(req.body);
  res.send('single blog post ' + req.params.blogId);
  next();
});

// DELETE SINGLE BLOG
router.delete('/delete-blog/:blogId', (req, res, next) => {
  //   res.send(req.body);
  res.send('delete blog post with id : ' + req.params.blogId);
  next();
});

module.exports = router;
