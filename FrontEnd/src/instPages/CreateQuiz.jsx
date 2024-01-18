// File: CreateQuiz.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizStyle/createquiz.css'; // Make sure to import the CSS file

const CreateQuiz = () => {
  const [instructor, setInstructor] = useState();
  const [topic, setTopic] = useState();
  const [subTopic, setSubtopic] = useState();
  const [questionList, setQuestionList] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);
  const [selectClass, setSelectClass] = useState({});
  const [showNewQuestion, setNewQuestion] = useState(false);
  const [showExistingQuestion, setExistingQuestion] = useState(false);
  
  const [questionData, setQuestionData] = useState({
    courseID: '',
    statement: '',
    topic: '',
    subTopic: '',
    options: ['', ''],
    correct: ''
  });

  const topics = [

    {
      "name" : "conditionals",
      "subtopics" : ["if else", "switch"]
    },
    {
      "name" : "loops",
      "subtopics" : ["for", "while", "do while", "for each"]
    },
    {
      "name" : "functions",
      "subtopics" : ["recursive", "linear"]
    },
  ]

  useEffect(() => {
    const storedClass = JSON.parse(localStorage.getItem('class'));
    setSelectClass(storedClass);
    console.log(storedClass);
    getInstructor();
  }, []);

  const getInstructor = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      window.location.href = 'http://localhost:5173/login';
    } else {
      axios.post('http://localhost:5000/api/token', { token })
        .then((response) => {
          if (response.data.status === 'ok') {
            setInstructor(response.data.instructor);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNewQuestionOpen = () => {
    setNewQuestion(true);
  };

  const handleNewQuestionClose = () => {
    setNewQuestion(false);
  };

  
  const handleExistingQuestionOpen = () => {
    setExistingQuestion(true);
  };

  const handleExistingQuestionClose = () => {
    setExistingQuestion(false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const updatedOptions = [...questionData.options];
      updatedOptions[index] = value;
      setQuestionData({ ...questionData, courseID: selectClass.course, options: updatedOptions });
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
    if(name === 'topic')
      setTopic(value)
  };

  const handleAddOption = () => {
    if (questionData.options.length < 4) {
      const updatedOptions = [...questionData.options, ''];
      setQuestionData({ ...questionData, options: updatedOptions });
    }
  };

  const handleSubmit = () => {
    console.log(questionData)
    axios.post('http://localhost:5000/questions', questionData)
      .then((response) => {
        setQuestionStats([...questionStats, response.data]);
        setQuestionData({
          courseID: selectClass.course,
          statement: '',
          options: ['', ''],
          correct: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteQuestion = (index) => {
    const updatedStats = [...questionStats];
    updatedStats.splice(index, 1);
    setQuestionStats(updatedStats);
  };

  const handleDone = () => {
    const updatedQuestions = questionStats.map(question => question._id);
    const data = {
      depID: instructor.department,
      courseID: selectClass.course,
      createdBy: instructor._id,
      marks: updatedQuestions.length,
      questions: updatedQuestions
    };

    axios.post('http://localhost:5000/quizes', data)
      .then((response) => {
        console.log(response.data);
        axios.get(`http://localhost:5000/classes/${selectClass._id}`)
          .then((res)=>{
            res.data.quizList.push(response.data._id)
            console.log(res.data)
            axios.put(`http://localhost:5000/classes/${selectClass._id}`, res.data)
            .then((response)=>{
              if (response==='ok')
                alert("Quiz Created Succesfully!")
            })

          })
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(()=>{
    if(!(topic)){
      axios.get(`http://localhost:5000/questions/getByCourse`, {courseID : selectClass.courseID})
      .then(async (response)=>{
        await setQuestionList(response.data.question)
        console.log(response.data.question)
        console.log(questionList)
      })
    }
  },[topic, subTopic])

  // function handleTopicChange(e){
  //   setTopic(e.target.value)
  //   setSubtopic('')

  // }
  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    setTopic(selectedTopic);
    setSubtopic('');
    const data = {
      courseID : selectClass.course,
      topic: topic,
      subTopic : subTopic
    }
      axios.post('http://localhost:5000/questions/getByCourse', data)
      .then((response)=>{
        console.log(response)
      })
  };
  const filteredSubtopics = topics.find((t) => t.name === topic)?.subtopics || [];

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <div className='class-container'>
                <button className='button-options' onClick={handleNewQuestionOpen}>New Question</button>
                <button className='button-options' onClick={handleExistingQuestionOpen}>Existing Question</button>

                {showNewQuestion && (
                  <div className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={handleNewQuestionClose}>&times;</span>
                      <form className='modal-inputs'>
                      <label>Select Topic:</label>
                        <select
                          name='topic'
                          value={questionData.topic}
                          onChange={handleInputChange}
                        >
                          <option defaultChecked>Select a topic</option>
                          {selectClass.topics.map((topic, index) => (
                            <option key={index} value={topic.name}>
                              {topic.name}
                            </option>
                          ))}
                        </select>

                        <label>Select Subtopic:</label>
                        <select
                          name='subTopic'
                          value={questionData.subTopic}
                          onChange={
                            handleInputChange
                            }
                        >
                          <option defaultChecked>Select SubTopic</option>
                          {topic &&
                            selectClass.topics
                              .find((t) => t.name === topic)
                              .subTopics.map((st, index) => (
                                <option key={index} value={st}>
                                  {st}
                                </option>
                              ))}
                        </select>
                        <label>Question Statement:</label>
                        <input
                          type='text'
                          name='statement'
                          value={questionData.statement}
                          onChange={handleInputChange}
                        />

                        {questionData.options.map((option, index) => (
                          <div key={index}>
                            <label>Option {index + 1}:</label>
                            <input
                              type='text'
                              name='options'
                              value={option}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </div>
                        ))}

                        {questionData.options.length < 4 && (
                          <button type='button' onClick={handleAddOption}>
                            Add New Option
                          </button>
                        )}

                        <label>Select Correct Option:</label>
                        <select
                          name='correct'
                          value={questionData.correct}
                          onChange={handleInputChange}
                        >
                          <option value='' defaultChecked disabled>
                            Choose correct option
                          </option>
                          {questionData.options.map((option, index) => (
                            <option key={index} value={option}>
                              {questionData.options[index]}
                            </option>
                          ))}
                        </select>

                        <button type='submit' onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}>Submit</button>
                      </form>
                    </div>
                  </div>
                )}

                {showExistingQuestion && (
                  
                  <div className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={handleExistingQuestionClose}>&times;</span>
                      <form className='modal-inputs'>
                        <label>Select Topic:</label>
                        <select
                          name='topic'
                          value={topic}
                          onChange={handleTopicChange}
                        >
                          {
                            topics.map((topic,index)=>(
                              <>
                                <option key={index} value={topic.name}>{topic.name}</option>
                              </>
                            ))
                          }
                        </select>
                        {topic && (
                          <>
                            <label>Select Subtopic:</label>
                            <select
            name='subTopic'
            value={subTopic}
            onChange={(e) => setSubtopic(e.target.value)}
          >
            <option value=''>Select a Subtopic</option>
            {filteredSubtopics.map((sub, index) => (
              <option key={index+10} value={sub}>
                {sub}
              </option>
            ))}
          </select>
                          </>
                        )}
                        <label>Existing Questions :</label>
                        <input
                          type='text'
                          name='statement'
                          value={questionData.statement}
                          onChange={handleInputChange}
                        />

                        {questionData.options.map((option, index) => (
                          <div key={index}>
                            <label>Option {index + 1}:</label>
                            <input
                              type='text'
                              name='options'
                              value={option}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </div>
                        ))}

                        {questionData.options.length < 4 && (
                          <button type='button' onClick={handleAddOption}>
                            Add New Option
                          </button>
                        )}

                        <label>Select Correct Option:</label>
                        <select
                          name='correct'
                          value={questionData.correct}
                          onChange={handleInputChange}
                        >
                          <option value='' defaultChecked disabled>
                            Choose correct option
                          </option>
                          {questionData.options.map((option, index) => (
                            <option key={index} value={option}>
                              {questionData.options[index]}
                            </option>
                          ))}
                        </select>

                        <button type='submit' onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}>Submit</button>
                      </form>
                    </div>
                  </div>

                )}
                <button className='button-options' type='submit' onClick={(e) => {
                  e.preventDefault();
                  handleDone();
                }}>Done</button>
              </div>
            </td>
            <td>
              <div className="quiz-section">
                <h1>Quiz</h1>
                {instructor && <p>Created by : {instructor.name}</p>}
                <p>Class : {selectClass.courseName}</p>
                <p>section : {selectClass.section}</p>
                <p>course : {selectClass.course}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Statement</th>
                      <th>Correct answer</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionStats && questionStats.map((question, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{question.statement}</td>
                        <td>{question.correct}</td>
                        <td>
                          <button onClick={() => {
                            handleDeleteQuestion(index);
                          }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CreateQuiz;
