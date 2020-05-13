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

module.exports.create = function(req,res){
   
}
module.exports.createSession = function(req,res){
   
}