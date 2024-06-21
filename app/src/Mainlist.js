import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DisplayHeader from './DisplayHeader';

const Mainlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || { username: '' };

  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { name: 'Search', items: ['Linear', 'Binary', 'Ternary'] },
    { name: 'Sort', items: ['Bubble', 'Selection', 'Insertion', 'Merge'] },
    { name: 'Graph', items: ['DFS', 'BFS', 'Multisource BFS'] }
  ];

  const handleTopicSelect = (topicName) => {
    setSelectedTopic(selectedTopic === topicName ? null : topicName);
  };

  const handleItemSelect = (topicName, item) => {
    navigate(`/${item.toLowerCase().replace(' ', '-')}`, { state: { username, topicName, item } });
  };

  const renderMainlist = () => (
    <div>
      <DisplayHeader topicName="Algorithms and Techniques" username={username} onBackClick={() => navigate('/')} />

      <div className="topics">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <button onClick={() => handleTopicSelect(topic.name)}>
              {topic.name}
            </button>
            {selectedTopic === topic.name && (
              <ul className="items">
                {topic.items.map((item, idx) => (
                  <button key={idx} onClick={() => handleItemSelect(topic.name, item)}>{item}</button>
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
