import cron from 'node-cron';
import sgMail from '@sendgrid/mail'
import { Quiz } from './models/QuizModel';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
    to: `${st}`,
    from: 'quizlyteam7889@gmail.com',
    subject: 'testing',
    text: "this is a test email",
    html: '<strong>NONE</strong>',
}

sgMail.send(msg).then(()=>{
    console.log("email sent")
}).catch((error)=>{
    console.log("ERROR", error)
})

cron.schedule('* * * * *', async () => {
    const fifteenMinutesAgo = new Date();
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15);
    const quizzes = await Quiz.find({
      updatedAt: { $lte: fifteenMinutesAgo }
    });
    if(quizzes){
        for (const quiz of quizzes) {
            sendEmailToStudents(quiz);
        }
    }
  }, {
    scheduled: true,
    timezone: "UTC" // Specify your timezone here, e.g., 'Asia/Kolkata'
  });
  
  // Function to send email to all students with quiz results
  async function sendEmailToStudents(quiz) {
    const stds = quiz.attemptees; // Array of IDs you want to fetch
     
      let students = [];
      let answers = []
        for (const std of stds) {
            const result = await Result.findOne({
                regno : std.regNo,
                quizID : quiz._id.$oid
            });
            const student = await Student.findById(std.regNo)
            if (result && student) {
            students.push({
                regNo: std.regNo,
                email : student.email,
                answers : result.answers,
                marksObtained: result.marksObtained
            });
        }

        }
      for(const s of students){
        for(const ans of s.answers){
            const question = await Question.findById(ans.questionID)
            answers.push({
                statement: question.statement,
                correctAnswer : ans.correctAnswer,
                givenAnswer : ans.givenAnswer
            })
        }

        const htmlContent = `
            <p>Quiz results for ${quiz.courseID} taken on ${quiz.updatedAt}:</p>
            <table border="1">
            <tr>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Given Answer</th>
            </tr>
            ${answers.map(answer => `
                <tr>
                <td>${answer.statement}</td>
                <td>${answer.correctAnswer}</td>
                <td>${answer.givenAnswer}</td>
                </tr>
            `).join('')}
            </table>
            <h3>You have Successully achived ${s.marksObtained} Marks.</h3>
        `;
        const msg = {
            to: `${s.email}`,
            from : 'quizlyteam7889@gmail.com',
            subject: `Quiz result for ${quiz.courseID} taken on ${quiz.updatedAt}`,
            html: htmlContent
        }
        sgMail.send(msg).then(()=>{
            console.log("email sent")
        }).catch((error)=>{
            console.log("ERROR:", error)
        })
        }
  }
  