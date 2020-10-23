const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/user');

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

app.post('/',async (req,res)=> {
    const {name,email,password} = req.body;
    let user = new User({
        name,
        email,
        password
    });
    await user.save(err=> {
        if(err){
            res.json(err)
        } else {
            res.json('Sucessfully saved');
        }
    }) 
})

app.listen(3000, (err)=> {
    if(err) console.log(err);
    console.log('Listening on 3000');
})