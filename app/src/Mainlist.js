// Mainlist.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DisplayHeader from './DisplayHeader';

const Mainlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isGuest, username } = location.state || { isGuest: false, username: '' };

  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { name: 'Search', items: ['Linear', 'Binary', 'Ternary'] },
    { name: 'Sort', items: ['Bubble', 'Selection', 'Insertion', 'Merge'] },
    { name: 'Graph', items: ['DFS', 'BFS', 'Multisource BFS'] }
  ];

  const handleTopicSelect = (topicName) => {
    setSelectedTopic(topicName === selectedTopic ? null : topicName);
  };

  const handleItemSelect = (item) => {
    // Pass username as part of state to /linear route
    navigate(`/${item.toLowerCase().replace(' ', '-')}`, { state: { username } });
  };

  const renderMainlist = () => (
    <div>
      {/* <h1>Algorithms and Techniques</h1>
      <p>{isGuest ? 'Guest' : `Logged in as: ${username}`}</p>
      <button onClick={() => navigate('/')}>Back to Main</button> */}
      <DisplayHeader text="Algorithms and Techniques" username={username} onBackClick={() => navigate('/')} /> {/* Pass text and username to DisplayHeader */}

      <div className="topics">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <button onClick={() => handleTopicSelect(topic.name)}>
              {topic.name}
            </button>
            {selectedTopic === topic.name && (
              <ul className="items">
                {topic.items.map((item, idx) => (
                  <button key={idx} onClick={() => handleItemSelect(item)}>{item}</button>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {renderMainlist()}
    </div>
  );
};

export default Mainlist;
