// File: CreateQuiz.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizStyle/createquiz.css'; // Make sure to import the CSS file

const CreateQuiz = () => {
  const [instructor, setInstructor] = useState();
  const [questionList, setQuestionList] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);
  const [selectClass, setSelectClass] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [questionData, setQuestionData] = useState({
    courseID: '',
    statement: '',
    topic: '',
    subTopic: '',
    options: ['', ''],
    correct: ''
  });

  useEffect(() => {
    const storedClass = JSON.parse(localStorage.getItem('class'));
    setSelectClass(storedClass);
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
  };

  const handleAddOption = () => {
    if (questionData.options.length < 4) {
      const updatedOptions = [...questionData.options, ''];
      setQuestionData({ ...questionData, options: updatedOptions });
    }
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/questions', questionData)
      .then((response) => {
        setQuestionStats([...questionStats, response.data]);
        setQuestionData({
          courseID: selectClass.course,
          statement: '',
          topic: '',
          subTopic: '',
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <div className='class-container'>
                {/* Your existing code */}
                {/* Add a button to trigger the modal */}
                <button className='button-options' onClick={handleOpenModal}>New Question</button>

                {/* Modal structure */}
                {showModal && (
                  <div className='modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={handleCloseModal}>&times;</span>
                      {/* Form for adding a new question */}
                      <form className='modal-inputs'>
                        <label>Select Topic:</label>
                        <input
                          name='topic'
                          value={questionData.topic}
                          onChange={handleInputChange}
                        />

                        <label>Select Subtopic:</label>
                        <input
                          name='subTopic'
                          value={questionData.subTopic}
                          onChange={handleInputChange}
                        />
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
