const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req,res){

 let post = await   Post.findById(req.body.post);
          
        if(post){

     let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                post.comments.push(comment);
                post.save();
                req.flash('success', 'Comment published!')

                res.redirect('/');
        }
    }

module.exports.destroy = async function(req,res){

    let comment = await Comment.findById(req.params.id);

              if(comment.user == req.user.id){
                  let postId = comment.post;

                  comment.remove();

           let post = await Post.findByIdAndUpdate(postId,
                    { $pull: {comments :req.params.id}})
                    return res.redirect('back');
              
              

       };

}