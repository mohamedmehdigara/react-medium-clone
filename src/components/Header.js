import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <a className="logo" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 103 36"
            className="logo-icon"
          >
            <path
              d="M0 0v36h4V4h24V0H0zm30 0v36h4V0h-4zm5.8 14.6l4.7 8.7h-3.7l-3-5.8h-2.6v5.8H30V0h9.6c3 0 5.5 2.2 5.9 5l1 9.6c.2 1.6-.7 3-2 3.8l3.5 6.6h-4l-3.2-6.1h-2.3v6h-4V0h9.6c3 0 5.5 2.2 5.9 5l1 9.6c.2 1.7-.6 3.1-1.9 3.9z"
              fill="#000"
            ></path>
          </svg>
        </a>
        <div className="search-bar">
          <input type="text" placeholder="Search Medium" />
        </div>
        <div className="header-actions">
          <a className="header-action" href="/write">
            Write
          </a>
          <a className="header-action" href="/notifications">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
              width="24px"
              height="24px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13H5v-2h14v2z" />
              <path
                fillRule="evenodd"
                d="M3 12c0-1.11.897-2 2-2h14c1.103 0 2 .89 2 2v2l2 3v2H1v-2l2-3v-2zm16 1.5c0-.275-.225-.5-.5-.5h-13c-.275 0-.5.225-.5.5v2c0 .275.225.5.5.5h13c.275 0 .5-.225.5-.5v-2z"
              />
            </svg>
          </a>
          <a className="header-action" href="/profile">
            <img
              className="avatar"
              src="avatar.jpg"
              alt="User Avatar"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
