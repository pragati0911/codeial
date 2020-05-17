const Like = require('../models/like');


const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.toggleLike = async function(req,res){
 
    try{

        let likeable;
        let deleted = false;

        if (req.query.type =='Post'){
            likeable= await (await Post.findById(req.query.id)).populated('likes');

        }else {
            likeable= await (await Comment.findById(req.query.id)).populated('likes');
        }

        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user: req.user._id
        })


        if(existingLike){
            likeable.likes.pull(existingLike._id)
            likeable.save();
            existingLike.remove();
            deleted:true;
        }else{
                let newLike = await Like.create({
                    user:req.user._id,
                    likeable:req.query.id,
                    onModel :req.query.type
                });
                likeable.likes.push(newLike._id);
                likeable.save();
        }

        return res.json(200, {
            message:"request success",
            data:{
                deleted:deleted
            }
        })

    }catch(err){
        console.log('err in toggling like')

    }




}





