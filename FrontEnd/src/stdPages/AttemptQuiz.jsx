import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";




const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
 
  const AttemptQuiz = () => {
    const [std, setStd] = useState();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [timer, setTimer] = useState(15);
    const [answer, setAnswer] = useState([{
        questionID: "",
        answer : ""
    }])
    const [intervalId, setIntervalId] = useState(null); // Store intervalId in the state
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const data = {
      token,
    };
  
    useEffect(() => {
      if (!token) {
        alert('You are not logged in');
        window.location.href = 'http://localhost:5173/';
      } else {
        axios
          .post('http://localhost:5000/api/token', data)
          .then((response) => {
            if (response.data.status === 'ok') {
              setStd(response.data.student);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [token]);
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/quizes/attempt/${id}`)
        .then((response) => {
          console.log(response.data.status);
          return response.data.data.questions;
        })
        .then((questions) =>
          Promise.all(
            shuffleArray(questions).map((questionId) =>
              axios.get(`http://localhost:5000/questions/${questionId}`).then((response) => ({
                statement: response.data.statement,
                options: shuffleArray(response.data.options),
                _id : response.data._id
              }))
            )
          )
        )
        .then((questionsData) => {
          setQuestions(questionsData);
          if (questionsData.length > 0) {
            setCurrentQuestion(questionsData[0]);
            setTimer(15);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, [id]);
  
    useEffect(() => {
      // Set a new timer when the component mounts or when the timer reaches 0
      if (timer > 0) {
        const id = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
  
        // Store the intervalId in the state
        setIntervalId(id);
  
        // Clear the interval when the component unmounts or when the timer reaches 0
        return () => clearInterval(id);
      } else {
        // Move to the next question when the timer reaches 0
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setCurrentQuestion(questions[currentQuestionIndex + 1]);
          setTimer(15);
        }
      }
    }, [timer, currentQuestionIndex, questions]);
  
    const handleNextQuestion = () => {
      // Clear the existing interval when the Next Question button is clicked
      clearInterval(intervalId);
  
      // Move to the next question and reset the timer
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCurrentQuestion(questions[currentQuestionIndex + 1]);
        setTimer(15);
      }
    };
  
    return (
        <div>
        {currentQuestion && (
          <div>
            <p>Time remaining: {timer} seconds</p>
            <label>Question {currentQuestionIndex + 1} : {currentQuestion.statement}</label>
            {currentQuestion.options.map((opt, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="answer" // Give each radio button the same name
                  value={opt}
                  onChange={()=>{
                    const ans = {
                        questionID : currentQuestion._id,
                        answer : opt
                    }
                  setAnswer([...answer, ans])
                    console.log(ans)
                  }
                  }
                />
                <label>{opt}</label>
              </div>
            ))}
            <button onClick={handleNextQuestion}>Next Question</button>
          </div>
        )}
      </div>
      
    );
  };
  
  export default AttemptQuiz;