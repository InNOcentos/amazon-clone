const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const {productRouter, categoryRouter, ownerRouter} = require('./routes');

const app = express();

mongoose.connect(`mongodb+srv://${config.db_user}:${config.db_password}@amazon-clone.lllez.mongodb.net/${config.db_name}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true},(err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to DB');
    }
})


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', ownerRouter);
    
app.listen(3000, (err)=> {
    if(err) console.log(err);
    console.log('Listening on 3000');
})