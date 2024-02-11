import cron from 'node-cron';
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
    to: 'ak3135311531@gmail.com',
    from: 'quizlyteam7889@gmail.com',
    subject: 'testing',
    text: "this is a test email",
    html: '<strong>lawda mera</strong>',
}

sgMail.send(msg).then(()=>{
    console.log("email sent")
}).catch((error)=>{
    console.log("lawda error a gya", error)
})

const sendResults = async () => {
    try {
        const thirtyMA = new DataTransfer(Date.now()- 30*60*1000);
        const quizzes = await Quiz.find({updatedAt : {$lte: thirtyMA}});

        quizzes.forEach(async (quiz) => {
            console.log(`Sending email for quiz with title: ${quiz._id}`);
        });
    } catch (error) {
        console.error('Error sending quiz emails:', error)
    }
};


cron.schedule('* * * * *', async () => {
    await sendResults();
});