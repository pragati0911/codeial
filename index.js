const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening');

app.use(express.urlencoded());
 app.use(cookieParser());

app.use(express.static('./assets'));

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
 





app.set('view engine','ejs');
app.set('views', './views');




app.use(session({
  name: 'codeial',
  secret: 'something',
  saveUninitialized:false,
  resave:false,
  cookie:{
      maxAge:(1000 * 60 * 100)
  },
  store : new MongoStore({
      
          mongooseConnection:db,
          autoRemove:'disabled'
      
  },
  function(err){
      console.log(err);
  })

}));

app.use(passport.initialize());
app.use(passport.session());



app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));


app.listen(port, function(err){ 
    if(err){
        console.log(err);
    }
    
    console.log("server is running")
});

