import React from 'react';

function Main() {
  return (
    <main className="main-content">
      <div className="main-section">
        <h2>Get unlimited access to all of Medium for less than $1/week.</h2>
        <button className="become-member-button">Become a member</button>
      </div>

      <div className="main-section">
        <h3>For you</h3>
        <ul className="for-you-list">
          <li>
            <a href="/following">Following</a>
          </li>
          <li>
            <a href="/gaming">Gaming</a>
          </li>
          <li>
            <a href="/business">Business</a>
          </li>
          <li>
            <a href="/basic-income">Basic Income</a>
          </li>
        </ul>
      </div>

      <div className="main-section">
        <div className="article-card">
          <h4>P. Rehan</h4>
          <p>in Dev Genius · Mar 10</p>
          <h5>Structure Your React Apps Like It’s 2030</h5>
          <p>Every React Developer meets one issue during his or her journey. This is how you construct an amazing app architecture. This blog post will teach you how to structure your directories correctly and avoid some common mistakes that most of us make when architecting react applications. Is this right for you? Before we begin, it...</p>
          <span>Reactjs</span>
          <span>8 min read</span>
        </div>
      </div>

      <div className="main-section">
        <div className="article-card">
          <h4>Luna Rojas</h4>
          <p>· Jun 6</p>
          <h5>10 Expert Performance Tips Every Senior JS React Developer Should Know</h5>
          <p>As a senior Javascript React developer, consistently improving the performance of your applications is an essential skill to master. We’ve gathered the top 10 expert performance tips that will elevate your React development game. Let’s take a deep dive into these advanced techniques, illustrated with code examples, and supercharge your...</p>
          <span>JavaScript</span>
          <span>16 min read</span>
        </div>
      </div>

      {/* Add more article cards based on your requirements */}
    </main>
  );
}

export default Main;
