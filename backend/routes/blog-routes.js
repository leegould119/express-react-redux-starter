const router = require('express').Router();
// ****************************************
//  BLOG ROUTES
// ****************************************
// POST
router.post('/create-new', (req, res, next) => {
  console.log(req.body);

  let blogCreationDate = new Date();
  let blogPostData = {
    type: 'POST',
    userId: req.body.userId,
    blogTitle: req.body.blogTitle,
    blogDescription: req.body.blogDescription,
    blogCoverImage: req.body.blogCoverImage,
    blogCreationDate: blogCreationDate
  };
  res.send(blogPostData);
  next();
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
