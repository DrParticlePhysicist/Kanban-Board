// src/components/ControlPanel.js
import React from 'react';
import './ControlPanel.css';

function ControlPanel({ setGroupBy, setSortBy }) {
  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="control-panel">
      <label>
        Group By:
        <select onChange={handleGroupByChange} defaultValue={localStorage.getItem('groupBy') || 'status'}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>
      <label>
        Sort By:
        <select onChange={handleSortByChange} defaultValue={localStorage.getItem('sortBy') || 'priority'}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
}

export default ControlPanel;
