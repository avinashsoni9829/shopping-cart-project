const express=require('express');
const router=express.Router();
// get pages index 
const Page=require('../models/page');


router.get('/',(req,res,next) =>{
   Page.find(({})).sort({sorting:1}).exec(function(err,pages){
       res.render('../views/admin/pages',{
           pages:pages
       });
   });
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
         
        Page.findOne({slug:slug},function(err,page){
         if(page)
         {
             req.flash('danger','page slug exist choose another ');
             res.render('../views/admin/add_page',{
                errors:errors,
                title: title,
                slug:slug,
                content:content
            });

         }
         else{
             var page=new Page({
                 title:title,
                 slug:slug,
                 content:content,
                 sorting:100
             });

             page.save(function(err){
                 if(err)
                 {
                     return console.log(err);
                 }
                 req.flash('success','page added!');
                 res.redirect('/admin/pages');


             });
         }

        });

    }

    
});



module.exports=router;
