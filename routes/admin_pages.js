const express=require('express');
const router=express.Router();
// get pages index 

router.get('/',(req,res,next) =>{
    res.send('admin pages!');
});

// get add page

router.get('/add-page',(req,res,next) =>{
    var title=" ";
    var slug=" ";
    var content=" ";

    res.render('admin/add_page',{
        title:title,
        slug:slug,
        content:content

    });
});



// POST add page

router.post('/add-page',(req,res,next) =>{
    req.checkBody('title','title must have a value').notEmpty();
    req.checkBody('content','Content  must have a value').notEmpty();
    var title=req.body.title;
    var slug=req.body.slug.replace(/\s+/g,'-').toLowerCase();
    if(slug=="")
    slug=title.replace(/\s+/g,'-').toLowerCase();
    var content=req.body.content;
    
    var errors=req.validationErrors();
    if(errors)
    {
        res.render('../views/admin/add_page',{
            errors:errors,
            title: title,
            slug:slug,
            content:content
        });
    }
    else{
         console.log("success!");

    }

    
});



module.exports=router;
