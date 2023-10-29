var express = require('express');
var router = express.Router();
const userModel= require("./users");
const post= require("./post")
const multer= require("multer");
// const Comment =require("./commint");
// const bodyParser = require('body-parser');


// router.post('/comments', async (req, res) => {
//   try {
//       const { postId, text } = req.body;
//       const newComment = new Comment({
//           postId,
//           userId: req.session.userId, // User authentication ke liye session use karein
//           text,
//       });
//       await newComment.save();
//       res.status(201).json(newComment);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Set up Multer and other configurations (body-parser, etc.)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static('uploads'));
router.post('/upload', upload.single('image'),  (req, res) => {
  const imagePath = 'uploads/' + req.file.filename;
  const caption = req.body.caption;
  console.log(`File uploaded successfully at ${imagePath}`);
  const newPost = new post({
    imagePath: imagePath,
    caption:caption,
    // Other fields for the post as needed
});

newPost.save()
    .then(() => {
        res.redirect('/profile');
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });

 
});

router.get('/uploadImage', function(req, res, next) {
  res.render('upload');
});
router.get('/profile', async function(req, res, next) {
  const allPost = await post.find()
  res.render('profile',{allPost});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/creatUser', async function(req, res, next) {
         const newUser = await userModel.create({
          username:req.body.username,
          email:req.body.email,
          password:req.body.password,
          fullname:req.body.fullname,
         });
         console.log(newUser)
         res.redirect('/loginScreen')
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username)
    const user = await userModel.findOne({ username });
    console.log(password,user.password)
    if (password===user.password) {
      // User login successful
      res.redirect('/mainPage');
    } else {
      // Invalid credentials
      res.send ('Invalid username or password' );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/loginScreen',function(req,res,next){
  res.render('login');
});

router.get('/mainPage',function(req,res,next){
  res.render('mainpage');
});







module.exports = router;
