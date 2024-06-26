import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DisplayHeader from './DisplayHeader';

const Mainlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, topicName, item } = location.state || { username: '', topicName: '', item: '' };

  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { name: 'Search', items: ['Linear Search', 'Binary Search', 'Ternary Search'] },
    { name: 'Sort', items: ['Bubble Sort', 'Heap Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Radix Sort', 'Selection Sort'] },
    { name: 'Graph', items: ['DFS', 'BFS', 'Multisource BFS'] }
  ];

  const handleTopicSelect = (topicName) => {
    setSelectedTopic(selectedTopic === topicName ? null : topicName);
  };

  const handleItemSelect = (topicName, item) => {
    navigate(`/${item.toLowerCase().replace(' ', '-')}`, { state: { username, topicName, item } });
  };

  const renderMainlist = () => (
    // <div>
    //   <DisplayHeader item="Algorithms and Techniques" username={username} />

    //   <div className="topics">
    //     {topics.map((topic, index) => (
    //       <div key={index} className="topic">
    //         <button onClick={() => handleTopicSelect(topic.name)}>
    //           {topic.name}
    //         </button>
    //         {selectedTopic === topic.name && (
    //           <ul className="items">
    //             {topic.items.map((item, idx) => (
    //               <button key={idx} onClick={() => handleItemSelect(topic.name, item)}>{item}</button>
    //             ))}
    //           </ul>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  
  <div className="bg-gray-100 min-h-screen py-8">
    <DisplayHeader item="Algorithms and Techniques" username={username} />

    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <button
                className="text-2xl font-semibold text-gray-800 hover:text-blue-600 focus:outline-none flex justify-center"
                onClick={() => handleTopicSelect(topic.name)}
              >
                {topic.name}
              </button>
              {selectedTopic === topic.name && (
                <ul className="mt-2">
                  {topic.items.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={() => handleItemSelect(topic.name, item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Optional: Add icons or images here */}
          </div>
        ))}
      </div>
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
