// File: QuizForm.js

import React, { useState, useEffect } from 'react';

function QuizForm({ selectedOption, onCloseModal }) {
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [questions, setQuestions] = useState([{ statement: '' }]);
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
    setQuestions([...questions, { statement: '' }]);
  };

  const handleStatementChange = (index, statement) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].statement = statement;
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuestions = () => {
    // Logic to save questions based on selectedOption
    // Add your implementation here

    // After saving the questions, you can show the added questions section
    setShowAddedQuestions(true);
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

      {/* Display question statement fields for unique questions */}
      {selectedOption !== 'premade' && (
        <div>
          {questions.map((q, index) => (
            <div key={index}>
              <label>Question Statement:</label>
              <input
                type="text"
                value={q.statement}
                onChange={(e) => handleStatementChange(index, e.target.value)}
              />
              <button onClick={() => handleRemoveQuestion(index)}>Remove</button>
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
              <li key={index}>{q.statement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizForm;
