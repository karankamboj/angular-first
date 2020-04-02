const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Blog = require('../models/blog');


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

router.get('/your-blogs',verifyToken,(req,res) => {
    let token = req.header.authorization.split(' ')[1]
    let payload = jwt.verify(token, 'secreetKey')
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
  console.log(blogData)
  
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

        res.status(200).send({token})
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