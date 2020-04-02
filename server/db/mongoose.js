const mongoose = require('mongoose');

const db = "mongodb://localhost:27017/myapp";


mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});