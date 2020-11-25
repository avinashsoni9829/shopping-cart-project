const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const config=require('./config/database');
const pages=require('./routes/pages');
const adminPages=require('./routes/admin_pages');
const bodyparser =require('body-parser');
const session=require('express-session');
const expressValidator=require('express-validator');


//connection to database
mongoose.connect(config.database,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log("connected!");
});


//initializing app
const app=express();
// setting the view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//setting the public folder
app.use(express.static(path.join(__dirname,'public')));
//setting the router

//body parser 
app.use(bodyparser.urlencoded({
    extended:false
}));

app.use(bodyparser.json());


//sessions

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

  // validator

  app.use(expressValidator({
      errorFormatter:function(param,msg,value)
      {
          var namespace=param.split('.'),
          root=namespace.shift(),
          formParam=root;

          while(namespace.length)
          {
              formParam +='['+namespace.shift()+']';
          }
          return{
              param: formParam,
              msg: msg,
              value: value
          };
      }
  }));



app.use('/admin/pages',adminPages);

app.use('/',pages);

//starting the server

const port=3000;

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});

   
