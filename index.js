const express = require('express');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);


app.use('/', require('./routes/index'));


app.set('view engine','ejs');
app.set('views', './views');



app.listen(port, function(err){ 
    if(err){
        console.log(err);
    }
    
    console.log("server is running")
});

