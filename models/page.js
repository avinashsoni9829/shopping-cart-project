var mongoose=require('mongoose')

var PageSchema=mongoose.Schema({
    title:
    {
        type:  String,
        required: true
    },
    slug:
    {
        type:  String,
        
    },
    content:
    {
        type:  String,
        required: true
    },
    sorting:
    {
        type:  Number,
        required: true
    }
});

const page=module.exports=mongoose.model('Page',PageSchema);
