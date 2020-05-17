const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    console.log('inside new comment');

    nodeMailer.transporter.sendMail({
        from :'gargpragati9@gmail.com',
        to: comment.user.email,
        subject: "new comment published ",
        html:'<h1> your comment is published</h1>'

    },(err,info) =>{
        if(err){
            console.log('error in sending main');
            return;
        }
        console.log('message sent',info);
        return;
    }
    )

}