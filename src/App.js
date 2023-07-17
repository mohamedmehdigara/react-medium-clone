import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Article from './components/Article';
import Navigation from './components/Navigation';
import Topics from './components/Topics';
import CreateArticle from "./components/CreateArticle";
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/article/:id" element={<Article/>} />
          <Route path="/topics" element={<Topics/>} />
          <Route path="/create" element={<CreateArticle/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

