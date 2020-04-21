const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Blog = require('../models/blog');
const multer = require('multer')
const nodemailer = require('nodemailer');
const expressWinston = require('express-winston');
const winston = require('winston');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId



// express-winston logger makes sense BEFORE the router
router.use(expressWinston.logger({
  transports: [
    new winston.transports.File({filename: 'log.json'})
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  responseField:!null
}));
expressWinston.requestWhitelist.push('body');

router.get('/', function(req, res, next) {
  res.write('This is a normal request, it should be logged to the console too')
  res.end()

});



function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }  
  let token = req.headers.authorization.split(' ')[1]
  
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }

  try {

    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
      }
      req.userId = payload.subject
  }
  catch(err) {
    return res.status(401).send('Unauthorized request')    
  }
  next()
}

const upload = multer({
  
  fileFilter(req, file, cb) {
    
      if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
          return cb(new Error('Please upload an image'))
      }
      // console.log("CHECK")
      cb(undefined, true)
  }
})

router.post('/upload',upload.single('avatar'), (req,res) => {
  // res.send(req)
  let avatar =  req.file.buffer
  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let email = payload.email
  // console.log(avatar)
  User.updateOne({ email: email }, { $set: { avatar: avatar } }).then((result)=> res.send("DONE"))
  .catch((err)=>res.status(400).send("ERR"))

},(err,req,res,next) => {
  res.send(err.message)
})

router.post('/send-email',(req,res) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'EMAIL@gmail.com',
      pass: 'PASS'
    }
  });
  
  var mailOptions = {
    from: 'EMAIL@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: 'Your Account has been logged in at location https://www.google.com/maps?q='+req.body.latitude+','+req.body.longitude
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send(req.body)
    } else {
      res.send('Email sent: ' + info.response);
    }
  });

})

router.post('/delete-comment',verifyToken,(req,res) => {

  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let writer = payload.email
  if(writer!=req.body.writer)
    res.status(404).send("CANNOT")
  else{

    Blog.updateOne(
      {'comments._id': ObjectId(req.body.commentid)}, 
      {$pull: {'comments': {'_id': ObjectId(req.body.commentid)}}}
    ).then((data)=>console.log(data))
    res.send("OK")

  }
  
  
})


router.post('/add-comment',verifyToken,(req,res) => {

  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let writer = payload.email

  var blog = Blog.findById(req.body.id,function(err,blog){
    blog.comments = blog.comments.concat({writer:writer,comment:req.body.comment})
    blog.save()
    res.send(blog)
  })

})


router.post('/update-profile',verifyToken,(req,res) => {
  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let id = payload.subject
  try {
    const user = User.findByIdAndUpdate(id,req.body).then((data)=>console.log(data))
    if(!user) {
      res.status(404).send()
    }
    else{
      res.send(user)
    }

  }
  catch(e){
    res.send(e)
  }
})



router.delete('/delete-blog/:id',(req,res) => {
  let id = req.params.id
  const blog=Blog.findByIdAndDelete(id,(err,blog) =>{
    if(err) {
      res.status(404).send("Cannot Delete")
    }
    else {
      res.send("Deleted")
    }
  })
})


router.get('/get-profile',verifyToken,(req,res) => {

  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let email = payload.email
  let id = payload.subject

  User.findOne({_id :id }, (err,data) => {
    if(err) {
      res.status(500).send("Unable to Fetch!")
    }
    else
    {
      res.send(data)
    }
    
  })
})

router.get('/get-avatar/:id',(req,res) => {

  try {
    User.find({_id :req.params.id }, (err,data) => {
      if(err) {
        res.status(500).send("Unable to Fetch!")
      }
      else
      {
        res.set('Content-type','image/jpg')
        res.send(data[0].avatar)
      }
      
    })
  }
  catch(e) {
    res.status(404).send(e)

  }
})

router.get('/my-blogs',verifyToken,(req,res) => {

    let token = req.headers.authorization.split(' ')[1]
    let payload = jwt.verify(token, 'secretKey')
    let email = payload.email
    Blog.find({ email:email }, (err,blogs) => {
      if(err) {
        res.status(500).send("Unable to Fetch Data!")
      }
      else {
        res.status(200).send(blogs)
      }
      
    })
})

router.get('/all-blogs',(req,res) => {
    
    Blog.find({}, (err,data) => {
      if(err) {
        res.status(500).send("Unable to Fetch!")
      }
      else
      {
        res.send(data)
      }
      
    })
    
})

router.post('/post-blog',verifyToken, (req,res) => {

  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let blogData = req.body
  blogData["email"]=payload.email
  // console.log(blogData)
  
  let blog = new Blog(blogData)
  
  blog.save((err, postedBlog) => {
    if (err) {
      console.log(err)   
       res.status(500).send("NOT POST")   
    } else {
      res.status(200).send('Posted')
    }
  })
})

router.post('/register', (req, res) => {
  let userData = req.body
  let email = req.body.email
  User.findOne({email: userData.email}, (err, user) => {

    if(err) {
      console.log(err)
    }
    else {
      if(!user) {
        let user = new User(userData)
        user.save((err, registeredUser) => {
          if (err) {
            console.log(err)      
          } else {
            let payload = { subject : registeredUser._id, email: registeredUser.email }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
          }
        })
      }
      else {
        res.status(401).send("Username Already Exists")
      }
    }

  })

})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } 
    else {

      if (!user) {
        res.status(401).send('Invalid Email')
      } 
      else if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } 
      else {
        let payload = { subject : user._id, email: user.email }
        let token = jwt.sign(payload, 'secretKey')

        res.status(200).send({email: user.email,token:token})
      }
    }
  })
})

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})


router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})



module.exports = router;