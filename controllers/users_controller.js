const User = require('../models/users');

module.exports.profile = function(req,res){
   return res.render('user_profile',{
      title: "profile"
   })
}


module.exports.signUp = function(req,res){

   return res.render('Sign_up', {
      title: "codeial | Sign up"
   })
}

module.exports.signIn = function(req,res){

   return res.render('Sign_in', {
      title: "codeial | Sign in"
   })
}

module.exports.create = function(req, res){
   if (req.body.password != req.body.confirm_password){
      //  req.flash('error', 'Passwords do not match');
       return res.redirect('back');
   }

   User.findOne({email: req.body.email}, function(err, user){
      //  if(err){req.flash('error', err); return}

       if (!user){
           User.create(req.body, function(err, user){
               // if(err){req.flash('error', err); return}

               return res.redirect('/users/sign-in');
           })
       }else{
         //   req.flash('success', 'You have signed up, login to continue!');
           return res.redirect('back');
       }

   });
}
   
   

module.exports.createSession = function(req,res){
      return res.redirect('/');
}