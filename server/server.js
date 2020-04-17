const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('./db/mongoose')
const api = require('./routes/api');


const port = 3000;
const app = express();
app.use(cors())
app.use(bodyParser.json()); 
app.use('/api', api);


app.listen(port, process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1',function(){
    console.log("Server running on localhost:" + port);
});