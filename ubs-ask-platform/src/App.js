import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, User, ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import './App.css';

const UBSLogo = () => (
  <div style={{width: 40, height: 40, background: '#d00000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
    {/* Placeholder for UBS logo, replace with <img src="/path/to/logo.png" ... /> */}
    <span style={{color: '#fff', fontWeight: 900, fontSize: 22}}>UBS</span>
  </div>
);

const divisions = [
  { name: 'Group Functions', key: 'group-functions', icon: '🏢', count: 24, desc: 'Client Portfolio', teams: ['Finance', 'HR', 'Risk', 'Legal'], questions: [
    { id: 1, title: "How to handle large client portfolios?", votes: 15, answers: 3, time: "2h ago" },
    { id: 2, title: "Best practices for quarterly reviews?", votes: 8, answers: 5, time: "4h ago" },
    { id: 3, title: "Compliance workflow questions", votes: 12, answers: 2, time: "1d ago" }
  ]},
  { name: 'IB Tech', key: 'ib-tech', icon: '💻', count: 18, desc: 'Tech & APIs', teams: ['API Team', 'DevOps', 'Backend', 'Frontend'], questions: [
    { id: 4, title: "API integration with legacy systems?", votes: 23, answers: 7, time: "1h ago" },
    { id: 5, title: "Docker deployment issues", votes: 11, answers: 4, time: "3h ago" },
    { id: 6, title: "Database migration strategies", votes: 19, answers: 6, time: "5h ago" }
  ]},
  { name: 'WMA', key: 'wma', icon: '📊', count: 31, desc: 'Wealth Mgmt', teams: ['Advisory', 'Portfolio', 'Client Services'], questions: [
    { id: 7, title: "Portfolio risk assessment tools?", votes: 17, answers: 4, time: "30m ago" },
    { id: 8, title: "Client reporting automation", votes: 14, answers: 3, time: "2h ago" },
    { id: 9, title: "Market analysis frameworks", votes: 21, answers: 8, time: "6h ago" }
  ]},
  { name: 'Asset Management', key: 'asset-management', icon: '💼', count: 15, desc: 'Funds & Assets', teams: ['Equities', 'Fixed Income', 'Real Estate'], questions: [
    { id: 10, title: "Fund performance tracking", votes: 9, answers: 2, time: "1h ago" },
    { id: 11, title: "Regulatory compliance updates", votes: 13, answers: 5, time: "4h ago" }
  ]},
  { name: 'General', key: 'general', icon: '🌐', count: 42, desc: 'General/Europe', teams: ['Europe', 'Support', 'Other'], questions: [
    { id: 12, title: "Office 365 migration timeline?", votes: 25, answers: 9, time: "45m ago" },
    { id: 13, title: "New employee onboarding process", votes: 18, answers: 6, time: "2h ago" }
  ]}
];

const projects = [
  { id: 1, name: 'Project X', desc: 'Refer to previous', status: 'Active' },
  { id: 2, name: 'Project Y', desc: 'Refer to previous', status: 'Planning' }
];
const communities = [
  { id: 1, name: 'DevOps', posts: 2, desc: 'CI/CD, infra, deployment', help: 'This week help...', upvotes: 4, downvotes: 1 },
  { id: 2, name: 'Process Improvement', posts: 1, desc: 'Workflow, efficiency', help: 'Need help with...', upvotes: 2, downvotes: 0 }
];
const errors = [
  { id: 38, title: 'Repository Migration', status: 'unresolved' },
  { id: 25, title: 'Init setup', status: 'mistake' }
];
const tags = ['API', 'Compliance', 'Onboarding', 'Migration'];
const hotQuestions = [
  { id: 1, title: 'How do I migrate from legacy system?', votes: 23, answers: 5, tags: ['Migration', 'Tech'], author: 'Sarah M.', time: '2h ago' },
  { id: 2, title: 'Best practices for client onboarding?', votes: 18, answers: 3, tags: ['Onboarding', 'Process'], author: 'Mike R.', time: '4h ago' }
];

function Navbar() {
  return (
    <header style={{padding: '2rem 0 1.5rem 0', borderBottom: '2px solid #e5e5e5', background: '#fff'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 900, margin: '0 auto'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8}}>
          <UBSLogo />
          <div className="ubs-navbar-logo" style={{fontSize: '2.2rem', fontWeight: 900, color: '#111', letterSpacing: 2, display: 'flex', alignItems: 'center'}}>
            UBS <span style={{fontWeight: 400, color: '#111', marginLeft: 8}}>ask</span>
          </div>
          <div className="ubs-navbar-user" style={{marginLeft: 32}}>
            <User />
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 600, marginTop: 16}}>
          <div className="ubs-navbar-search" style={{flex: 1, margin: 0, display: 'flex', alignItems: 'center'}}>
            <Search style={{marginRight: 8, color: '#888'}} />
            <input placeholder="Search..." style={{width: '100%'}} />
          </div>
          <button className="ubs-navbar-create" style={{marginLeft: 16}}>
            <Plus style={{marginRight: 6, marginBottom: -2}} />CREATE
          </button>
        </div>
      </div>
    </header>
  );
}

function DivisionGrid() {
  return (
    <div className="ubs-division-grid" style={{minHeight: 'calc(100vh - 64px - 4rem)'}}>
      {divisions.map((division) => (
        <Link key={division.key} to={`/division/${division.key}`} className="ubs-division-card" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px'}}>
          <div>
            <div className="ubs-division-card-icon">{division.icon}</div>
            <div className="ubs-division-card-title">{division.name}</div>
            <div className="ubs-division-card-count">{division.count} Questions</div>
            <div className="ubs-division-card-desc">{division.desc}</div>
          </div>
          <div style={{marginTop: 16}}>
            <div style={{fontWeight: 600, color: '#d00000', fontSize: '1rem', marginBottom: 4}}>Teams</div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {division.teams.map((team) => (
                <li key={team} style={{color: '#222', fontSize: '0.98rem', marginBottom: 2}}>{team}</li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

function DivisionPage() {
  const { divisionKey } = useParams();
  const navigate = useNavigate();
  const division = divisions.find((d) => d.key === divisionKey);
  if (!division) return <div className="p-10 text-center text-red-600">Division not found.</div>;
  return (
    <div style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
      <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: '#d00000', fontWeight: 700, marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
        <ArrowLeft style={{marginRight: 6}} /> Back to Divisions
      </button>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
        <div className="ubs-division-card-icon">{division.icon}</div>
        <h1 style={{fontSize: '2rem', fontWeight: 800, color: '#111'}}>{division.name}</h1>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32}}>
        <div>
          <div className="ubs-section">
            <div className="ubs-section-title">Projects</div>
            {projects.map((p) => (
              <div key={p.id} className="ubs-card" style={{marginBottom: 12}}>
                <div style={{fontWeight: 700, color: '#111'}}>{p.name}</div>
                <div style={{color: '#888', fontSize: 14}}>{p.desc}</div>
                <div style={{color: '#d00000', fontWeight: 600, fontSize: 13, marginTop: 4}}>{p.status}</div>
              </div>
            ))}
          </div>
          <div className="ubs-section">
            <div className="ubs-section-title">Communities</div>
            {communities.map((c) => (
              <div key={c.id} className="ubs-community-card">
                <div className="ubs-community-card-title">{c.name}</div>
                <div className="ubs-community-card-meta">{c.desc}</div>
                <div style={{fontSize: 13, color: '#d00000', marginBottom: 4}}>{c.help}</div>
                <div className="ubs-community-card-actions">
                  <span className="ubs-upvote"><ThumbsUp /> {c.upvotes}</span>
                  <span className="ubs-downvote"><ThumbsDown /> {c.downvotes}</span>
                  <button style={{background: '#d00000', color: '#fff', border: 'none', borderRadius: 8, padding: '2px 12px', fontWeight: 600, cursor: 'pointer'}}>Add Post</button>
                </div>
              </div>
            ))}
          </div>
          <div className="ubs-section">
            <div className="ubs-section-title">Common Errors (AI)</div>
            {errors.map((e) => (
              <div key={e.id} className="ubs-error-card">
                <div className="ubs-error-title">{e.title}</div>
                <div className="ubs-error-meta">Error #{e.id} &middot; {e.status}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="ubs-section">
            <div className="ubs-section-title">Tags</div>
            <div style={{marginBottom: 16}}>
              {tags.map((tag) => (
                <span key={tag} className="ubs-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="ubs-section">
            <div className="ubs-section-title">Hot Questions</div>
            {hotQuestions.map((q) => (
              <div key={q.id} className="ubs-hot-question">
                <div className="ubs-hot-question-title">{q.title}</div>
                <div className="ubs-hot-question-meta">by {q.author} &middot; {q.time}</div>
                <div style={{display: 'flex', gap: 12, fontSize: 14, marginBottom: 4}}>
                  <span className="ubs-upvote"><ThumbsUp /> {q.votes}</span>
                  <span className="ubs-downvote"><ThumbsDown /> 0</span>
                  <span style={{color: '#d00000', fontWeight: 600}}><MessageSquare style={{marginRight: 2}} />{q.answers} answers</span>
                </div>
                <div>{q.tags.map((tag) => <span key={tag} className="ubs-tag">{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
      <DivisionGrid />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/division/:divisionKey" element={<DivisionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
