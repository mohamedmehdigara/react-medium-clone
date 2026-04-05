import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Medium Design Tokens ---
const theme = {
  colors: {
    black: '#242424',
    white: '#ffffff',
    gray: '#757575',
    lightGray: '#f2f2f2',
    border: '#ebebeb',
    green: '#1a8917',
    greenHover: '#156d12',
  },
  fonts: {
    ui: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
    article: 'charter, Georgia, Cambria, "Times New Roman", Times, serif',
  }
};

// --- Global Styles (Medium Reset) ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0; padding: 0;
    font-family: ${props => props.theme.fonts.ui};
    color: ${props => props.theme.colors.black};
    background: ${props => props.theme.colors.white};
    -webkit-font-smoothing: antialiased;
  }
  * { box-sizing: border-box; }
  h2 { font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
  p { line-height: 1.6; }
`;

// --- Zustand Store ---
const useStore = create(
  persist(
    (set) => ({
      articles: [
        { 
          id: '1', 
          title: 'The Tunisian Tech Ecosystem in 2026', 
          excerpt: 'Why Tunis is becoming the new hub for React developers...', 
          content: 'The growth of startups in North Africa has hit an inflection point...',
          author: 'Dev Master',
          date: 'Apr 5',
          readTime: '5 min read'
        },
      ],
      addArticle: (article) => set((state) => ({ 
        articles: [{ 
          ...article, 
          id: Date.now().toString(), 
          date: 'Apr 5', 
          author: 'Anonyme',
          readTime: '4 min read' 
        }, ...state.articles] 
      })),
    }),
    { name: 'medium-clone-v2' }
  )
);

// --- Styled Layout Components ---
const HeaderWrapper = styled.header`
  height: 75px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10vw;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1000;
`;

const MainGrid = styled.main`
  max-width: 1192px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 368px;
  gap: 64px;
  padding: 40px 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 115px;
  height: fit-content;
  @media (max-width: 900px) { display: none; }
`;

const FooterNav = styled.footer`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid ${props => props.theme.colors.border};
  
  a {
    font-size: 13px;
    color: ${props => props.theme.colors.gray};
    text-decoration: none;
    &:hover { color: #000; }
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  background: ${props => props.$primary ? props.theme.colors.green : 'transparent'};
  color: ${props => props.$primary ? '#fff' : props.theme.colors.gray};
  
  ${props => props.$primary && css`
    &:hover { background: ${props.theme.colors.greenHover}; }
  `}
`;

// --- UI Features ---

const Header = () => {
  const location = useLocation();
  const isCreate = location.pathname === '/create';

  return (
    <HeaderWrapper>
      <Link to="/" style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-1.5px' }}>Medium</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {!isCreate && <Link to="/create" style={{ color: theme.colors.gray, fontSize: '14px' }}>Write</Link>}
        <Button>Sign In</Button>
        <Button $primary>{isCreate ? 'Publish' : 'Get Started'}</Button>
      </div>
    </HeaderWrapper>
  );
};

const ArticleCard = ({ article }) => (
  <div style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '13px', marginBottom: '8px' }}>
        <strong>{article.author}</strong> · <span style={{ color: theme.colors.gray }}>{article.date}</span>
      </div>
      <Link to={`/article/${article.id}`}>
        <h2 style={{ fontSize: '20px', margin: '0 0 4px 0' }}>{article.title}</h2>
        <p style={{ fontSize: '15px', color: theme.colors.gray, margin: '0 0 12px 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {article.excerpt}
        </p>
      </Link>
      <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: theme.colors.gray }}>
        <span style={{ background: theme.colors.lightGray, padding: '2px 8px', borderRadius: '10px' }}>Technology</span>
        <span>{article.readTime}</span>
      </div>
    </div>
    <div style={{ width: '112px', height: '112px', background: '#f2f2f2', borderRadius: '2px' }} />
  </div>
);

// --- Pages ---

const Home = () => {
  const articles = useStore(state => state.articles);
  return (
    <MainGrid>
      <div>
        {articles.map(art => <ArticleCard key={art.id} article={art} />)}
      </div>
      <Sidebar>
        <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Staff Picks</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div style={{ fontSize: '12px' }}><strong>User {i}</strong></div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>The future of engineering in Tunis</div>
            </div>
          ))}
        </div>
        <FooterNav>
          <a href="#">Help</a><a href="#">Status</a><a href="#">About</a>
          <a href="#">Careers</a><a href="#">Blog</a><a href="#">Privacy</a>
        </FooterNav>
      </Sidebar>
    </MainGrid>
  );
};

const CreateArticle = () => {
  const navigate = useNavigate();
  const addArticle = useStore(state => state.addArticle);
  const [form, setForm] = useState({ title: '', content: '' });

  // Handle the publish button that is logically in the header
  const handlePublish = useCallback(() => {
    if (!form.title) return;
    addArticle({ ...form, excerpt: form.content.substring(0, 150) + '...' });
    navigate('/');
  }, [form, addArticle, navigate]);

  return (
    <div style={{ maxWidth: '740px', margin: '40px auto', padding: '0 24px' }}>
      <input 
        placeholder="Title" 
        onChange={e => setForm({...form, title: e.target.value})}
        style={{ width: '100%', border: 'none', fontSize: '42px', outline: 'none', fontFamily: theme.fonts.article, marginBottom: '20px' }}
      />
      <textarea 
        placeholder="Tell your story..." 
        onChange={e => setForm({...form, content: e.target.value})}
        style={{ width: '100%', border: 'none', fontSize: '21px', outline: 'none', fontFamily: theme.fonts.article, minHeight: '400px', resize: 'none' }}
      />
      {/* Hidden trigger for header publish button - in a real app, use the store to trigger this */}
      <div style={{ position: 'fixed', top: '18px', right: '10vw', zIndex: '2000' }}>
         <Button $primary onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
};

const ArticleDetail = () => {
  const { id } = useParams();
  const article = useStore(state => state.articles.find(a => a.id === id));
  if (!article) return <div style={{ padding: '100px', textAlign: 'center' }}>Story not found.</div>;

  return (
    <article style={{ maxWidth: '680px', margin: '50px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '42px', fontFamily: theme.fonts.article, marginBottom: '20px', lineHeight: '1.2' }}>{article.title}</h1>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', alignItems: 'center' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#f2f2f2' }} />
        <div>
          <div style={{ fontSize: '16px' }}>{article.author}</div>
          <div style={{ fontSize: '14px', color: theme.colors.gray }}>{article.date} · {article.readTime}</div>
        </div>
      </div>
      <p style={{ fontSize: '21px', fontFamily: theme.fonts.article, lineHeight: '1.6', color: '#292929', whiteSpace: 'pre-wrap' }}>
        {article.content}
      </p>
    </article>
  );
};

// --- App Root ---
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/create" element={<CreateArticle />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}