const express=require('express');
const router=express.Router();
// get pages index 

router.get('/',(req,res,next) =>{
    res.send('admin pages!');
});

// get add page

router.get('/add-page',(req,res,next) =>{
    const title=" ";
    const slug=" ";
    const content=" ";

    res.render('admin/add_page',{
        title:title,
        slug:slug,
        content:content

    });
});



module.exports=router;
