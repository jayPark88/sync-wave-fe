import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              홈
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todos" className={`nav-link ${isActive('/todos') ? 'active' : ''}`}>
              할 일 목록
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedules" className={`nav-link ${isActive('/schedules') ? 'active' : ''}`}>
              스케줄
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;