const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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