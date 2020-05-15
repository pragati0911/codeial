const User = require('../models/users');

module.exports.profile = function(req,res){
   User.findById(req.params.id, function(err,user){
      return res.render('user_profile',{
         title: "profile",
         profile_user: user
      });

   });
  
}


module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
    return  res.redirect('users/profile');
   }
   return res.render('Sign_up', {
      title: "codeial | Sign up"
   })
}

module.exports.signIn = function(req,res){
   if(req.isAuthenticated()){
     return res.redirect('/users/profile');
   }

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

module.exports.destroySession = function(req,res){
   req.logout();
   return res.redirect('/');
}



module.exports.update= function(req,res){

   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
             
         return res.redirect('back');


      });
   }else{
       return res.status();
   }

}