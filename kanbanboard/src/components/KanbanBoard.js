import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, users, displayMode }) => {
  let groupedData;

  switch (displayMode.group) {
    case 'groupByUser':
      groupedData = users.map((user) => ({
        group: user.name,
        items: tickets.filter((ticket) => ticket.userId === user.id),
      }));
      break;
    case 'groupByPriority':
      const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      groupedData = priorityLabels.map((label, priority) => ({
        group: label,
        items: tickets.filter((ticket) => ticket.priority === priority),
      }));
      break;
    case 'groupByStatus':
      const statusLabels = ['Backlog', 'Todo', 'In progress', 'Done'];
      groupedData = statusLabels.map((status) => ({
        group: status,
        items: tickets.filter((ticket) => ticket.status === status),
      }));
      break;
    default:
      groupedData = [{ group: 'All Tickets', items: tickets }];
  }

  if (displayMode.order === 'orderByPriority') {
    groupedData.forEach((group) => {
      group.items = group.items.sort((a, b) => a.priority - b.priority);
    });
  } else if (displayMode.order === 'orderByStatus') {
    const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];
    groupedData.forEach((group) => {
      group.items = group.items.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    });
  }

  return (
    <div className="kanban-board">
      {groupedData.map((group, index) => (
        <div key={index} className="kanban-column">
          <h2>{group.group}</h2>
          {group.items.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;




/*
import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard';
import ControlPanel from './ControlPanel';
import './KanbanBoard.css';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(() => localStorage.getItem('sortBy') || 'priority');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Access tickets array from the data object
        if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          throw new Error("Data format is incorrect");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Save groupBy and sortBy settings in localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  if (loading) {
    return <div className="kanban-board">Loading...</div>;
  }

  if (error) {
    return <div className="kanban-board">Error: {error}</div>;
  }

  // Group tickets based on selected groupBy option
  const groupedTickets = tickets.reduce((groups, ticket) => {
    const groupKey = ticket[groupBy];
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(ticket);
    return groups;
  }, {});

  // Sort tickets in each group based on selected sortBy option
  const sortedTickets = Object.entries(groupedTickets).map(([group, tickets]) => {
    return {
      group,
      tickets: tickets.sort((a, b) => {
        if (sortBy === 'priority') return b.priority - a.priority;
        return a.title.localeCompare(b.title);
      }),
    };
  });

  return (
    <div className="kanban-board">
      <ControlPanel setGroupBy={setGroupBy} setSortBy={setSortBy} />
      {sortedTickets.map(({ group, tickets }) => (
        <div key={group} className="ticket-group">
          <h2>{group}</h2>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
*/