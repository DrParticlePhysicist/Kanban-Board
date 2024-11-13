// src/components/DisplayButton.js
import React from 'react';

const DisplayButton = ({ setDisplayMode }) => {
  return (
    <div className="display-button">
      <label>Display: </label>
      <select onChange={(e) => setDisplayMode(e.target.value)}>
        <option value="user">By User</option>
        <option value="priority">By Priority</option>
      </select>
    </div>
  );
};

export default DisplayButton;
