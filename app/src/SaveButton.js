const SaveButton = ({ username, topicName, item, arrayElements }) => {
  const saveIt = () => {
    const currentTime = new Date().toLocaleString();
    const alertMessage = `
      Username: ${username}
      Topic Name: ${topicName}
      Item Name: ${item}
      Array Elements: ${JSON.stringify(arrayElements)}
      Current Time: ${currentTime}
    `;
    alert(alertMessage);
  };

  return (
    <button onClick={saveIt} className="p-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 hover:text-white">
      Save
    </button>

  );
};

export default SaveButton;
