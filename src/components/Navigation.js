import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul className="navigation-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/create">Create Article</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
