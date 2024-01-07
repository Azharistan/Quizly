// File: QuizForm.js

import React, { useState, useEffect } from 'react';

function QuizForm({ selectedOption, onCloseModal }) {
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [questions, setQuestions] = useState([{ statement: '', options: [''], correctOption: 0, selectedOption: null }]);
  const [premadeOptions, setPremadeOptions] = useState([]);
  const [selectedPremadeOption, setSelectedPremadeOption] = useState('');
  const [showAddedQuestions, setShowAddedQuestions] = useState(false);

  useEffect(() => {
    // Fetch topics and subtopics from an API
    // Example API endpoints: '/api/topics' and '/api/subtopics'
    // Replace them with your actual API endpoints
    fetch('/api/topics')
      .then(response => response.json())
      .then(data => setTopics(data))
      .catch(error => console.error('Error fetching topics:', error));

    fetch('/api/subtopics')
      .then(response => response.json())
      .then(data => setSubtopics(data))
      .catch(error => console.error('Error fetching subtopics:', error));

    // Fetch premade options from an API
    // Example API endpoint: '/api/premade-questions'
    fetch('/api/premade-questions')
      .then(response => response.json())
      .then(data => setPremadeOptions(data))
      .catch(error => console.error('Error fetching premade questions:', error));
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, { statement: '', options: [''], correctOption: 0, selectedOption: null }]);
  };

  const handleStatementChange = (index, statement) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].statement = statement;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, option) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = option;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, correctOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = correctOption;
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestions = () => {
    // Logic to save questions based on selectedOption
    // Add your implementation here

    // After saving the questions, you can show the added questions section
    setShowAddedQuestions(true);
  };

  const handleQuizSubmission = () => {
    // Logic to handle quiz submission
    // Add your implementation here

    // For demonstration, just updating the selected option for each question randomly
    const updatedQuestions = questions.map(q => ({ ...q, selectedOption: Math.floor(Math.random() * q.options.length) }));
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <div>
        <label>TOPIC:</label>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="">Select a topic</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>SUB TOPIC:</label>
        <select value={subTopic} onChange={(e) => setSubTopic(e.target.value)}>
          <option value="">Select a subtopic</option>
          {subtopics.map((st) => (
            <option key={st.id} value={st.id}>
              {st.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display question statement and options fields for unique questions */}
      {selectedOption !== 'premade' && (
        <div>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex}>
              <label>Question Statement:</label>
              <input
                type="text"
                value={q.statement}
                onChange={(e) => handleStatementChange(questionIndex, e.target.value)}
              />
              <div>
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label>Option {optionIndex + 1}:</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    />
                    <button onClick={() => handleRemoveOption(questionIndex, optionIndex)}>Remove Option</button>
                  </div>
                ))}
                <button onClick={() => handleAddOption(questionIndex)}>Add Option</button>
              </div>
              <label>Correct Option:</label>
              <select
                value={q.correctOption}
                onChange={(e) => handleCorrectOptionChange(questionIndex, parseInt(e.target.value, 10))}
              >
                {q.options.map((_, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRemoveQuestion(questionIndex)}>Remove Question</button>
            </div>
          ))}
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>
      )}

      {/* Display premade question selection for premade questions */}
      {selectedOption === 'premade' && (
        <div>
          <label>Premade Questions:</label>
          <select
            value={selectedPremadeOption}
            onChange={(e) => setSelectedPremadeOption(e.target.value)}
          >
            <option value="">Select a premade question</option>
            {premadeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.question}
              </option>
            ))}
          </select>
        </div>
      )}

      <button onClick={handleSaveQuestions}>Save Questions</button>
      <button onClick={onCloseModal}>Cancel</button>

      {/* Display added questions after saving */}
      {showAddedQuestions && (
        <div>
          <h3>Added Questions:</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
              <strong>{q.statement}</strong>
              <div>
                  
                  <ul>
                    {q.options.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        {optionIndex === q.correctOption ? <span>{option}</span> : option}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label>Your Option:</label>
                  <select
                    value={q.selectedOption !== null ? q.selectedOption : ''}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].selectedOption = parseInt(e.target.value, 10);
                      setQuestions(updatedQuestions);
                    }}
                  >
                    <option value="">Select your answer</option>
                    {q.options.map((_, optionIndex) => (
                      <option key={optionIndex} value={optionIndex}>
                        Option {optionIndex + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={handleQuizSubmission}>Submit Quiz</button>
                {q.selectedOption !== null && (
                  <p>Your answer is {q.selectedOption === q.correctOption ? 'correct' : 'wrong'}</p>
                )}
              
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizForm;
