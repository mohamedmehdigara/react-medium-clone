import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <a href="/staff-picks">Staff Picks</a>
        </li>
        <li>
          <a href="/barack-obama">Barack Obama</a>
        </li>
        <li>
          <a href="/thank-you">Thank You to America’s Librarians for Protecting Our Freedom to Read</a>
        </li>
        <li>
          <a href="/thomas-smith">Thomas Smith</a>
        </li>
        <li>
          <a href="/generator">The Generator</a>
        </li>
        <li>
          <a href="/google-bard">Google Bard’s New Visual Feature is a Game Changer</a>
        </li>
        <li>
          <a href="/microsoft-design">Microsoft Design</a>
        </li>
        <li>
          <a href="/change-of-typeface">A change of typeface: Microsoft’s new default font has arrived</a>
        </li>
        <li>
          <a href="/full-list">See the full list</a>
        </li>
      </ul>

      <div className="sidebar-section">
        <h3>Discover Medium writers you already follow on Twitter.</h3>
        <a href="/connect-twitter">Connect to Twitter</a>
        <a href="/maybe-later">Maybe Later</a>
      </div>

      <div className="sidebar-section">
        <h3>Recommended topics</h3>
        <ul className="recommended-topics">
          <li>
            <a href="/money">Money</a>
          </li>
          <li>
            <a href="/comics">Comics</a>
          </li>
          <li>
            <a href="/technology">Technology</a>
          </li>
          <li>
            <a href="/reactjs">Reactjs</a>
          </li>
          <li>
            <a href="/react">React</a>
          </li>
          <li>
            <a href="/front-end-development">Front End Development</a>
          </li>
          <li>
            <a href="/react-native">React Native</a>
          </li>
          <li>
            <a href="/more-topics">See more topics</a>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Who to follow</h3>
        <ul className="who-to-follow">
          <li>
            <a href="/the-sandbox">The Sandbox</a>
          </li>
          <li>
            <a href="/baby-swap">BabySwap</a>
          </li>
          <li>
            <a href="/playbux">Playbux</a>
          </li>
          <li>
            <a href="/more-suggestions">See more suggestions</a>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Reading list</h3>
        <p>Click the on any story to easily add it to your reading list or a custom list that you can share.</p>
      </div>

      <div className="sidebar-section">
        <a href="/help">Help</a>
        <a href="/status">Status</a>
        <a href="/writers">Writers</a>
        <a href="/blog">Blog</a>
        <a href="/careers">Careers</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/about">About</a>
        <a href="/text-to-speech">Text to speech</a>
        <a href="/teams">Teams</a>
      </div>
    </aside>
  );
}

export default Sidebar;
