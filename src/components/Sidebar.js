import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/board">Board</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;