import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/articles') // Replace with your API endpoint
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1 className="home-title">Medium Clone</h1>
        <p className="home-description">A clone of the Medium website built with React.js</p>
      </header>
      <div className="articles-container">
        {articles.map(article => (
          <div className="article" key={article.id}>
            <img className="article-image" src={article.image} alt={article.title} />
            <div className="article-details">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-author">By {article.author}</p>
              <p className="article-summary">{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

