import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`https://api.example.com/articles/${id}`) // Replace with your API endpoint
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}

export default Article;
