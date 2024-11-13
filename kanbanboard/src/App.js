import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayMode, setDisplayMode] = useState({ group: 'groupByUser', order: 'none' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGroupingChange = (groupMode) => {
    setDisplayMode((prev) => ({ ...prev, group: groupMode }));
  };

  const handleOrderingChange = (orderMode) => {
    setDisplayMode((prev) => ({ ...prev, order: orderMode }));
  };

  return (
    <div className="app">
      <div className="display-button">
        <button>Display</button>
        <div className="dropdown">
          <div className="dropdown-item">
            <span>Grouping</span>
            <div className="nested-dropdown">
              <button onClick={() => handleGroupingChange('groupByUser')}>Group by User</button>
              <button onClick={() => handleGroupingChange('groupByPriority')}>Group by Priority</button>
              <button onClick={() => handleGroupingChange('groupByStatus')}>Group by Status</button>
            </div>
          </div>
          <div className="dropdown-item">
            <span>Ordering</span>
            <div className="nested-dropdown">
              <button onClick={() => handleOrderingChange('orderByPriority')}>Order by Priority</button>
              <button onClick={() => handleOrderingChange('orderByStatus')}>Order by Status</button>
            </div>
          </div>
        </div>
      </div>
      <KanbanBoard tickets={tickets} users={users} displayMode={displayMode} />
    </div>
  );
};

export default App;
        
    



/*
import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;

*/