import React, { useState } from 'react';
import LinearSearch from './LinearSearch';

const Mainlist = ({ isGuest, username, onBackClick }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const topics = [
    { name: 'Search', items: ['Linear', 'Binary', 'Ternary'] },
    { name: 'Sort', items: ['Bubble', 'Selection', 'Insertion', 'Merge'] },
    { name: 'Graph', items: ['DFS', 'BFS', 'Multisource BFS'] }
  ];

  const handleTopicSelect = (topicName) => {
    setSelectedTopic(topicName === selectedTopic ? null : topicName); // Toggle visibility
  };

  const handleItemSelect = (item) => {
    setSelectedAlgorithm(item);
  };

  const renderMainlist = () => (
    <div>
      <h1>Algorithms and Techniques</h1>
      <p>{isGuest ? 'Guest' : `Logged in as: ${username}`}</p>
      <button onClick={onBackClick}>Back to Main</button>
      
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
      {selectedAlgorithm === 'Linear' ? (
        <LinearSearch 
          onBackClick={() => setSelectedAlgorithm(null)} 
          isGuest={isGuest} 
          username={username} 
        />
      ) : (
        renderMainlist()
      )}
    </div>
  );
};

export default Mainlist;
