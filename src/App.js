import React, { useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Design System ---
const theme = {
  colors: {
    primary: '#1a8917', // Medium Green
    text: '#292929',
    secondary: '#6b6b6b',
    border: '#f0f0f0',
    bg: '#ffffff',
    sidebar: '#fafafa',
  },
  fonts: {
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }
};

// --- Global Reset & Styles ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.sans};
    background-color: ${props => props.theme.colors.bg};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }
  * { box-sizing: border-box; }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; }
`;

// --- Store Logic (Local-First) ---
const useStore = create(
  persist(
    (set) => ({
      articles: [
        { 
          id: '1', 
          title: 'Mastering Deterministic Logic in React', 
          excerpt: 'How to build complex systems without relying on external APIs...', 
          content: 'Building local-first applications requires a deep understanding of state machines...', 
          date: 'Apr 4' 
        },
      ],
      addArticle: (article) => set((state) => ({ 
        articles: [
          { 
            ...article, 
            id: Date.now().toString(), 
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
          }, 
          ...state.articles
        ] 
      })),
    }),
    { name: 'medium-clone-state' } // Storage Key
  )
);

// --- Styled Components Library ---
const Nav = styled.nav`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  height: 65px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  align-items: center;
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 80px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  background: ${props => props.$variant === 'outline' ? 'transparent' : props.theme.colors.primary};
  color: ${props => props.$variant === 'outline' ? props.theme.colors.text : 'white'};
  border: ${props => props.$variant === 'outline' ? '1px solid #ccc' : 'none'};
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { opacity: 0.8; transform: translateY(-1px); }
`;

// --- Feature Components ---

const ArticleCard = React.memo(({ article }) => (
  <div style={{ marginBottom: '48px' }}>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center', fontSize: '0.85rem' }}>
      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#eee' }} />
      <strong>Senior Dev</strong> · <span style={{ color: '#6b6b6b' }}>{article.date}</span>
    </div>
    <Link to={`/article/${article.id}`}>
      <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: '800', lineHeight: '1.3' }}>{article.title}</h2>
      <p style={{ color: theme.colors.secondary, lineHeight: '1.5', margin: '0 0 20px 0' }}>{article.excerpt}</p>
    </Link>
    <div style={{ display: 'flex', gap: '15px', color: '#6b6b6b', fontSize: '0.8rem', alignItems: 'center' }}>
      <span style={{ background: '#f2f2f2', padding: '4px 10px', borderRadius: '15px' }}>Development</span>
      <span>6 min read</span>
    </div>
  </div>
));

const Sidebar = () => (
  <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px' }}>What we're reading</h3>
    {[1, 2].map(i => (
      <div key={i} style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Building the next generation of web apps</h4>
        <small style={{ color: '#6b6b6b' }}>John Doe in Tunisia Tech</small>
      </div>
    ))}
    <div style={{ borderTop: '1px solid #eee', marginTop: '30px', paddingTop: '20px' }}>
      <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: '2' }}>
        Help · Status · About · Careers · Blog · Privacy · Terms
      </p>
    </div>
  </aside>
);

// --- Page Views ---

const Home = () => {
  const articles = useStore(state => state.articles);
  return (
    <MainLayout>
      <section>
        {articles.map(art => <ArticleCard key={art.id} article={art} />)}
      </section>
      <Sidebar />
    </MainLayout>
  );
};

const CreateArticle = () => {
  const navigate = useNavigate();
  const addArticle = useStore(state => state.addArticle);
  const [form, setForm] = useState({ title: '', content: '' });

  const handlePublish = useCallback((e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    
    addArticle({
      ...form,
      excerpt: form.content.substring(0, 140) + '...'
    });
    navigate('/');
  }, [form, addArticle, navigate]);

  return (
    <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 20px' }}>
      <form onSubmit={handlePublish}>
        <input 
          autoFocus
          placeholder="Title" 
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '3rem', marginBottom: '30px', fontFamily: theme.fonts.serif }}
        />
        <textarea 
          placeholder="Tell your story..." 
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.3rem', minHeight: '400px', resize: 'none', lineHeight: '1.7' }}
        />
        <Button type="submit" style={{ position: 'fixed', top: '15px', right: '10%', zIndex: '1100' }}>Publish</Button>
      </form>
    </div>
  );
};

const ArticleDetail = () => {
  const { id } = useParams();
  const article = useStore(state => state.articles.find(a => a.id === id));

  if (!article) return <div style={{ textAlign: 'center', padding: '100px' }}>Story not found.</div>;

  return (
    <article style={{ maxWidth: '700px', margin: '70px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '20px', fontFamily: theme.fonts.serif, lineHeight: '1.2' }}>{article.title}</h1>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', alignItems: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eee' }} />
        <div>
          <div style={{ fontWeight: '600' }}>Senior Developer</div>
          <div style={{ fontSize: '0.85rem', color: '#6b6b6b' }}>{article.date} · 12 min read</div>
        </div>
      </div>
      <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#292929', whiteSpace: 'pre-wrap' }}>
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
        <Nav>
          <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: theme.fonts.serif, letterSpacing: '-1px' }}>Medium</Link>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <Link to="/create" style={{ color: theme.colors.secondary, fontSize: '0.9rem' }}>Write</Link>
            <Button $variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </Nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/create" element={<CreateArticle />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}