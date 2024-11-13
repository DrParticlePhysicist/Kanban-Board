import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>ID: {ticket.id}</p>
      <p>Tag: {ticket.tag.join(', ')}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default TicketCard;




/*
import React from 'react';
import './TicketCard.css';

function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <p>User: {ticket.user}</p>
    </div>
  );
}

export default TicketCard;
*/