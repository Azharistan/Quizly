import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCourse = () => {
  const [course, setCourse] = useState({
    _id: '',
    name: '',
    depID: '',
    creditHr: '',
    topics: [{ name: '', subTopics: [''] }],
  });
  const [loading, setLoading] = useState(false);
  const {id} = useParams()
  useEffect (()=>{
    axios.get(`http://localhost:5000/courses/${id}`)
    .then((response)=>{
      console.log(response.data)
      setCourse(response.data)
    })
  },[])

  const handleChange = (e, topicIndex, subtopicIndex) => {
    const { name, value } = e.target;
  
    if (name === 'name') {
      // Handle topic name change
      setCourse((prevCourse) => {
        const updatedTopics = [...prevCourse.topics];
        updatedTopics[topicIndex] = { ...updatedTopics[topicIndex], name: value };
        return { ...prevCourse, topics: updatedTopics };
      });
    } else if (name === 'subtopic') {
      // Handle subtopic name change
      setCourse((prevCourse) => {
        const updatedTopics = [...prevCourse.topics];
        updatedTopics[topicIndex].subTopics[subtopicIndex] = value;
        return { ...prevCourse, topics: updatedTopics };
      });
    } else if (name === 'newSubtopic') {
      // Handle new subtopic name change
      setCourse((prevCourse) => {
        const updatedTopics = [...prevCourse.topics];
        updatedTopics[topicIndex].subTopics = updatedTopics[topicIndex].subTopics.map((st, index) =>
          index === subtopicIndex ? value : st
        );
        return { ...prevCourse, topics: updatedTopics };
      });
    } else {
      // Handle other input changes
      setCourse({ ...course, [name]: value });
    }
  };
  

  // const handleAddTopic = () => {
  //   setCourse((prevCourse) => ({
  //     ...prevCourse,
  //     topics: [...prevCourse.topics, { name: '', subTopics: [''] }],
  //   }));
  // };

  const handleAddTopic = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      topics: [...prevCourse.topics, { name: '', subTopics: [''] }],
    }));
  };

  // const handleAddSubtopic = (topicIndex) => {
  //   setCourse((prevCourse) => {
  //     const updatedTopics = [...prevCourse.topics];
  //     updatedTopics[topicIndex].subTopics.push('');
  //     return { ...prevCourse, topics: updatedTopics };
  //   });
  // };

  const handleAddSubtopic = (topicIndex) => {
    setCourse((prevCourse) => {
      const updatedTopics = [...prevCourse.topics];
      updatedTopics[topicIndex].subTopics = [...updatedTopics[topicIndex].subTopics, ''];
      return { ...prevCourse, topics: updatedTopics };
    });
  };

  const handleEditCourse = () => {
    setLoading(true);
    console.log(course)
    axios.put(`http://localhost:5000/courses/${course._id}`, course)
  };

  return (
    <div>
      <BackButton />
      {loading && <Spinner />}

      <h1 className='text-3xl'>Edit Courses</h1>
      <div>
        <div>
          <label>Course ID</label>
          <input type='text' name='_id' value={course._id} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={course.name} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Department</label>
          <input type='text' name='depID' value={course.depID} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Credit Hours</label>
          <input type='text' name='creditHr' value={course.creditHr} onChange={(e) => handleChange(e)} />
        </div>
        
        <div>
          {course.topics.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <label>{`Topic ${topicIndex + 1}`}</label>
              <input
                type='text'
                name='name'
                value={topic.name}
                onChange={(e) => handleChange(e, topicIndex)}
              />
              {topic.subTopics.map((subtopic, subtopicIndex) => (
                <div key={subtopicIndex}>
                  <label>{`Subtopic ${subtopicIndex + 1}`}</label>
                  <input
                    type='text'
                    name='subtopic'
                    value={subtopic}
                    onChange={(e) => handleChange(e, topicIndex, subtopicIndex)}
                  />
                </div>
              ))}
              <button type='button' onClick={() => handleAddSubtopic(topicIndex)}>
                Add Subtopic
              </button>
            </div>
          ))}
          <button type='button' onClick={handleAddTopic}>
            Add Topic
          </button>
        </div>

        <button onClick={handleEditCourse}>Save</button>
      </div>
    </div>
  );
};

export default EditCourse;
