const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const config=require('./config/database');

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


app.get('/',(req,res,next)=>{
    res.send('working!');
});













//starting the server

const port=3000;

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});

   
