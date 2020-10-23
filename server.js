const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(`mongodb+srv://${config.db_user}:${config.db_password}@amazon-clone.lllez.mongodb.net/${config.db_name}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true},(err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
})

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res)=> {
    res.send('Hi')
})

app.post('/',(req,res)=> {
    res.send('Hi')
})

app.listen(3000, (err)=> {
    if(err) console.log(err);
    console.log('Listening on 3000');
})